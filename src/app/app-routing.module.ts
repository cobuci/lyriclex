import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent as LyricsIndex } from './pages/lyrics/index/index.component';


const routes: Routes = [

  { path: 'lyrics', component: LyricsIndex },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
