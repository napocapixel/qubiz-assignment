import express, { Request, Response } from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { promisify } from "util";
import { FileInfo } from "./models/file-info.model";
import { FileType } from "./enums/file-type.enum";

const app = express();
const PORT = 3000;
const stat = promisify(fs.stat);
const readdir = promisify(fs.readdir);

app.use(cors());

// Helper function to get file stats safely
async function getFileStats(filePath: string): Promise<fs.Stats | null> {
  try {
    return await stat(filePath);
  } catch (error) {
    return null;
  }
}

// Helper function to format date
function formatDate(date: Date): string {
  return date.toISOString();
}

// Error handling middleware
function handleFileSystemError(error: Error, res: Response): void {
  if (error.message.includes("ENOENT")) {
    res.status(404).json({ error: "File or directory not found" });
  } else if (error.message.includes("EACCES")) {
    res.status(403).json({ error: "Permission denied" });
  } else {
    res.status(500).json({ error: "Internal server error" });
  }
}

app.get("/api/files", async (req: Request, res: Response) => {
  try {
    const requestedPath = req.query.path;

    // Check requested path
    if (!requestedPath || typeof requestedPath !== "string") {
      return res.status(400).json({
        error: "Path parameter is required",
      });
    }

    // Resolve the path to prevent directory traversal attacks
    const resolvedPath = path.resolve(requestedPath);

    const stats = await getFileStats(resolvedPath);
    if (!stats) {
      return res.status(404).json({
        error: "Path does not exist",
      });
    }

    // Check if it's a directory
    if (!stats.isDirectory()) {
      return res.status(400).json({
        error: "Path is not a directory",
      });
    }

    // Read directory contents
    const files = await readdir(resolvedPath);
    const fileInfos: FileInfo[] = [];

    for (const file of files) {
      const filePath = path.join(resolvedPath, file);
      const fileStats = await getFileStats(filePath);

      if (fileStats) {
        const fileInfo: FileInfo = {
          name: file,
          type: fileStats.isDirectory() ? FileType.DIRECTORY : FileType.FILE,
          size: fileStats.isFile() ? fileStats.size : undefined,
          creationDate: formatDate(fileStats.birthtime),
          lastModified: formatDate(fileStats.mtime),
          path: filePath,
        };
        fileInfos.push(fileInfo);
      }
    }

    // Sort directories first, then files, both alphabetically
    fileInfos.sort((a, b) => {
      if (a.type !== b.type) {
        return a.type === FileType.DIRECTORY ? -1 : 1;
      }
      return a.name.localeCompare(b.name);
    });

    res.json(fileInfos);
  } catch (error) {
    if (error instanceof Error) {
      return handleFileSystemError(error, res);
    }
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/api/file", async (req: Request, res: Response) => {
  try {
    const requestedPath = req.query.path;

    if (!requestedPath || typeof requestedPath !== "string") {
      return res.status(400).json({
        error: "Path parameter is required",
      });
    }

    // Resolve the path to prevent directory traversal attacks
    const resolvedPath = path.resolve(requestedPath);

    // Check if path exists
    const stats = await getFileStats(resolvedPath);
    if (!stats) {
      return res.status(404).json({
        error: "File or directory not found",
      });
    }

    const fileInfo: FileInfo = {
      name: path.basename(resolvedPath),
      type: stats.isDirectory() ? FileType.DIRECTORY : FileType.FILE,
      size: stats.isFile() ? stats.size : undefined,
      creationDate: formatDate(stats.birthtime),
      lastModified: formatDate(stats.mtime),
      path: resolvedPath,
    };

    res.json(fileInfo);
  } catch (error) {
    if (error instanceof Error) {
      return handleFileSystemError(error, res);
    }
    res.status(500).json({ error: "Internal server error" });
  }
});

app
  .listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  })
  .on("error", (err) => {
    console.error("Server failed to start:", err);
  });
