import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoggingService} from '../shared/logging.service';
import {StorageService} from "../shared/storage.service";
import {RecipeService} from "../recipes/recipe.service";
import {AuthService} from "../auth/auth.service";
import {Subscription} from "rxjs";
import {User} from "../auth/user.model";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
    // providers: [LoggingService]
})
export class HeaderComponent implements OnInit, OnDestroy {
    collapsed = true;
    authUser: User = null;
    authSub: Subscription;

    constructor(
        private loggingService: LoggingService,
        private recipeService: RecipeService,
        private storageService: StorageService,
        protected authService: AuthService,
    ) {
    }

    ngOnInit(): void {
        this.authSub = this.authService.userSubj.subscribe(user => this.authUser = user)
    }

    ngOnDestroy(): void {
        this.authSub.unsubscribe();
    }

    onShowLogs() {
        this.loggingService.showAllLogs();
    }

    signOut(): void {
        this.authService.signOut();
    }

    saveAll() {
        this.storageService.saveAllRecipes(this.recipeService.getRecipes())
            .subscribe()
    }

    reload() {
        this.storageService.getAllRecipes()
            .subscribe(recipes => {
                this.recipeService.setRecipes(recipes);
            })
    }

    addDummyData() {
        fetch('/assets/dummy.data.json')
            .then(res => res.json())
            .then((data) => {
                this.storageService.addRecipes(data)
                    .subscribe(res => {
                        this.recipeService.addRecipes(res);
                    })
            })
    }

}
