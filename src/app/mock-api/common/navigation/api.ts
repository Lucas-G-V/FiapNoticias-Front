import { Injectable } from '@angular/core';
import { cloneDeep } from 'lodash-es';
import { FuseNavigationItem } from '@fuse/components/navigation';
import { FuseMockApiService } from '@fuse/lib/mock-api';
import { defaultNavigation, horizontalNavigation } from 'app/mock-api/common/navigation/data';

@Injectable({
    providedIn: 'root'
})
export class NavigationMockApi
{

    private readonly _defaultNavigation: FuseNavigationItem[] = defaultNavigation;
    private readonly _horizontalNavigation: FuseNavigationItem[] = horizontalNavigation;


    constructor(private _fuseMockApiService: FuseMockApiService)
    {
        // Register Mock API handlers
        this.registerHandlers();
    }

    registerHandlers(): void
    {

        this._fuseMockApiService
            .onGet('api/common/navigation')
            .reply(() => {

                // Fill horizontal navigation children using the default navigation
                this._horizontalNavigation.forEach((horizontalNavItem) => {
                    this._defaultNavigation.forEach((defaultNavItem) => {
                        if ( defaultNavItem.id === horizontalNavItem.id )
                        {
                            horizontalNavItem.children = cloneDeep(defaultNavItem.children);
                        }
                    });
                });

                return [
                    200,
                    {
                        default   : cloneDeep(this._defaultNavigation),
                        horizontal: cloneDeep(this._horizontalNavigation)
                    }
                ];
            });
    }
}
