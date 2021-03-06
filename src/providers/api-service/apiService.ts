import {Injectable} from '@angular/core';
import {SoapApiCaller} from "./soap-api-caller";



/*
 Generated class for the ApiServiceProvider provider.

 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
@Injectable()
export class ApiServiceProvider {


  constructor(private soapApiCaller: SoapApiCaller) {
  }

  public getLanguages(): Array<string> {
    return this.soapApiCaller.getResource('getLanguages', null);
  }

  public getFeedSources(selectedLang: string): Array<any> {
    let sources = this.soapApiCaller.getResource('getFeedSources', {
      sLang: selectedLang
    }).sort((a: any, b: any) => {
      if (a.sFeedLabel > b.sFeedLabel)
        return 1;
      else if (a.sFeedLabel < b.sFeedLabel)
        return -1;
      return 0;
    });
    return sources;
  }

  public getCategories(selectedSources: Array<any>, selectedLang: string): Array<string> {
    let categories: Array<string> = this.soapApiCaller.getResource('getCategories', {
      sUserSources: this.getSourcesUrls(selectedSources),
      sLang: selectedLang
    }).sort();
    // latin alphabet comes before the greek one, so SciFY News will be the top category while browsing in greek
    // we are moving that category to the end of the list
    if (categories[0].search('SciFY') !== -1) {
      let deletedCategories: Array<string> = categories.splice(0, 1);
      categories.push(deletedCategories[0]);
    }
    return categories;
  }

  public getTopics(selectedSources: Array<any>, selectedCategory: string, selectedLang: string): Promise<any> {
    return this.soapApiCaller.getResourceAsync('getTopics', {
      sUserSources: this.getSourcesUrls(selectedSources),
      sCategory: selectedCategory,
      sLang: selectedLang
    });
  }

  public getTopicsByKeyword(keyword: string, selectedSources: Array<any>, selectedLang: string): Array<any> {
    return this.soapApiCaller.getResource('getTopicsByKeyword',
      {sKeyword: keyword, sUserSources: this.getSourcesUrls(selectedSources), sLang: selectedLang}
    );
  }

  public getSummary(topicId: string, selectedSources: Array<any>, selectedLang: string): Promise<any> {
    return this.soapApiCaller.getResourceAsync('getSummary',
      {
        sTopicID: topicId,
        sUserSources: this.getSourcesUrls(selectedSources),
        sLang: selectedLang
      }
    );
  }

  private getSourcesUrls(sources: Array<any>): Array<string> {
    return (sources[0] === 'ALL') ? sources : sources.map(s => s.sFeedLink);
  }
}
