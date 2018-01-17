import {Component, ViewChild} from '@angular/core';
import { NavController } from 'ionic-angular';
import {TopicsProvider} from "../../providers/topics/topics";
import {SummariesProvider} from "../../providers/summaries/summaries";
import {CategoriesProvider} from "../../providers/categories/categories";
import {CategoriesViewManager} from "../../lib/categories-view-manager";
import {GoogleAnalytics} from '@ionic-native/google-analytics';

/**
 * Generated class for the SummaryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-summary',
  templateUrl: 'summary.html',
})
export class SummaryPage {

  public selectedCategory: string;
  public selectedCategoryDefaultImage: string;
  public selectedTopic: any;
  public selectedSummary: any;

  constructor(private navCtrl: NavController, private topicsProvider: TopicsProvider,
              private summaryProvider: SummariesProvider, private categoriesProvider: CategoriesProvider,
              protected ga: GoogleAnalytics) {
    this.selectedSummary = this.summaryProvider.getSummary();
    if (this.selectedSummary) {
      this.selectedCategory = this.categoriesProvider.getSelectedCategory();
      this.selectedCategoryDefaultImage = CategoriesViewManager.getCategoryDefaultImage(this.selectedCategory);
      this.selectedTopic = this.topicsProvider.getSelectedTopic();
      this.ga.trackView("Summary: " + this.selectedTopic.Title);
      console.log(this.selectedSummary);
    }
  }
}
