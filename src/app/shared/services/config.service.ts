import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  static resourceApiUrl(resource: string): string {
    return `${environment.baseApiUrl}${resource}`;
  }

  static resourceClientUrl(): string {
    return `${environment.baseClientUrl}`;
  }

  static urls = {
    baseClient: ConfigService.resourceClientUrl(),
    base: ConfigService.resourceApiUrl(''),
    dashboard: ConfigService.resourceApiUrl('/InsuranceOverview'),
    riskSegments: ConfigService.resourceApiUrl('/riskSegments'),
    marketingCampaign: ConfigService.resourceApiUrl('/marketingCampaign'),
    churnRisk: ConfigService.resourceApiUrl('/churnRisk'),
    fraudDetection: ConfigService.resourceApiUrl('/fraudDetection'),
    userProfile: ConfigService.resourceApiUrl('/customerProfile'),
    auth: ConfigService.resourceApiUrl('/auth')
  }
  
}
