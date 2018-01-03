import { Injectable } from '@angular/core';
import { SOAPClient } from '../../lib/soapclient';

@Injectable()
export class SoapClientProvider {

  private serverUrl:string = "http://main.newsumservice.scify.org:60500";
  private wsdlPath:string = "/NewSumFreeService/NewSumFreeService";//?wsdl";
  private namespace:string = "http://NewSumFreeService.Server.NewSumServer.scify.org/";
  // private soap:string = "http://main.newsumservice.scify.org:60500/NewSumFreeService/NewSumFreeService";
  private  soapService: any;

  constructor() {
    this.soapService = new SOAPClient(this.namespace);
    // this.serverUrl, this.wsdlPath, this.namespace);
    // this.soapService.envelopeBuilder = this.envelopeBuilder;
    // this.soapService.jsoResponseHandler = (response:{}) => {this.responseJso = response};
    // this.soapService.localNameMode = true;
  }

  public getResource(queryString) {
    return this.soapService.invoke(this.serverUrl + this.wsdlPath, queryString, [], false, (data) => {
        console.log(data);
        return data;
    });
  }
}
