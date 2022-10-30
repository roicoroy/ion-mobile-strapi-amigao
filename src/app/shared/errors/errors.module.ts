import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ErrorDialogService } from './errors/error-dialog.service';
import { LoadingDialogService } from './loading/loading-dialog.service';
import { MaterialModule } from '../material.module';
import { CoreModule } from './core/core.module';

// const sharedComponents = [LoadingDialogComponent, ErrorDialogComponent];

@NgModule({
  // declarations: [...sharedComponents],
  imports: [
    CommonModule, 
    RouterModule, 
    MaterialModule,
    CoreModule
  ],
  // exports: [...sharedComponents],
  providers: [ErrorDialogService, LoadingDialogService],
  // entryComponents: [...sharedComponents],
})
export class ErrorsModule {}
