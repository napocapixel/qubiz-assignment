import { Component, inject, input, OnInit, output, SimpleChanges } from "@angular/core";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";

@Component({
    selector: 'app-explorer-form',
    templateUrl: './explorer-form.component.html',
    styleUrls: ['./explorer-form.component.scss'],
    imports: [ReactiveFormsModule]
})
export class ExplorerFormComponent implements OnInit {
    private fb = inject(FormBuilder);

    value = input<string>();
    pathSubmitted = output<string>();
    
    explorerForm: FormGroup = new FormGroup({});

    ngOnInit(): void {
        this.explorerForm = this.fb.nonNullable.group({
            path: [this.value() || '', Validators.required]
        });
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['value']) {
            this.explorerForm.get('path')?.setValue(this.value());
        }
    }

    onSubmit() {
        if (this.explorerForm.invalid) {
            return;
        }
        this.pathSubmitted.emit(this.explorerForm.getRawValue().path);
    }
}