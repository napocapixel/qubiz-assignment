import { Component, input, output } from "@angular/core";
import { Breadcrumb } from "../../../shared/models/breadcrumb.model";

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent {
    breadcrumbs = input<Breadcrumb[]>([]);
    pathSelected = output<string>();
}
