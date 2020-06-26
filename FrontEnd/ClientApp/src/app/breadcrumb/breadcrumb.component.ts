import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

// Simple class to display the breadcrumb 
@Component({ 
  selector: 'app-breadcrumb', 
  templateUrl: 'breadcrumb.component.html',
  styleUrls: [ 'breadcrumb.component.css' ]
  })

export class BreadcrumbComponent {
  // Define an input parameter passed in via the [step] attribute
  @Input() step: number;
}