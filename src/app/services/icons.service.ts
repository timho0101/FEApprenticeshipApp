import { Injectable } from "@angular/core";
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';

@Injectable({
  providedIn: 'root'
})

export class IconsService {
  constructor(
    private iconRegistry: MatIconRegistry, 
    private sanitizer: DomSanitizer
  ) {}

  // This method set the name of registered icons
  public getIcons() {
    this.Twitter('twitter')
    this.Facebook('facebook')
    this.Linkedin('linkedin')
  }

  // Angular feature DomSanitizer and MatIconRegistry used to register icons
  private Twitter(twitter:string): any {
    return this.iconRegistry.addSvgIcon(`${twitter}`, this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/twitter.svg'));
  }

  private Facebook(fb:string): any {
    return this.iconRegistry.addSvgIcon(`${fb}`, this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/facebook.svg'));
  }

  private Linkedin(linkedin:string): any {
    return this.iconRegistry.addSvgIcon(`${linkedin}`, this.sanitizer.bypassSecurityTrustResourceUrl('assets/icons/linkedin.svg'));
  }
}
