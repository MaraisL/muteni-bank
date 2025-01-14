import { Component } from '@angular/core';
import { StepOneComponent } from './step-one/step-one.component';
import { StepTwoComponent } from './step-two/step-two.component';
import { FormDataService } from '../../services/form-data.service';
import { CommonModule } from '@angular/common';
import { StepThreeComponent } from './step-three/step-three.component';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { TranslationService } from '../../services/translation.service';
import { StepSummaryComponent } from './step-summary/step-summary.component';
import { StepFourComponent } from './step-four/step-four.component';
import { StepFiveComponent } from './step-five/step-five.component';
import { StepSixComponent } from './step-six/step-six.component';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';

@Component({
  standalone: true,
  selector: 'app-multi-step-form',
  templateUrl: './multi-step-form.component.html',
  imports: [
    StepOneComponent,
    StepTwoComponent,
    StepThreeComponent,
    StepFourComponent,
    StepFiveComponent,
    StepSixComponent,
    StepSummaryComponent,
    CommonModule,
    BreadcrumbComponent,
    ProgressBarComponent,
  ],
})
export class MultiStepFormComponent {
  steps = [
    'FORM_STEP_1_BREADCRUMB',
    'FORM_STEP_2_BREADCRUMB',
    'FORM_STEP_3_BREADCRUMB',
    'FORM_STEP_4_BREADCRUMB',
    'FORM_STEP_5_BREADCRUMB',
    'FORM_STEP_6_BREADCRUMB',
    'FORM_STEP_SUMMARY_BREADCRUMB',
  ];

  currentStep = 0;
  formData: any = {};

  constructor(
    private formDataService: FormDataService,
    private translationService: TranslationService
  ) {}

  goToNext() {
    this.currentStep++;
  }

  goToPrevious() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  goToStep(step: number) {
    if (step < this.currentStep) {
      this.currentStep = step;
    }
  }

  finish() {
    this.formData = this.formDataService.getAllData(); //Get data
    this.currentStep++;
  }

  restart() {
    this.formDataService.resetData(); // Reset data
    this.currentStep = 1;
  }

  getTranslation(key: string): string {
    return this.translationService.translate(key);
  }
}
