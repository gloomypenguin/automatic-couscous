import { NgModule } from '@angular/core';
import { SearchPipe } from './search/search.pipe';
import { SortPipe } from './sort/sort.pipe';
@NgModule({
    declarations: [
        SearchPipe, SortPipe
    ],
    imports: [],
    exports: [
        SearchPipe, SortPipe
    ]
})
export class PipesModule {}
