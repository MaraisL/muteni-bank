import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class TranslationService {
  private translations: any = {};
  private currentLang: string = 'en';

  constructor(private http: HttpClient) {
    // Check if a langage is set
    const storedLang = localStorage.getItem('currentLang');
    if (storedLang) {
      this.currentLang = storedLang;
    }
  }

  loadTranslations(lang: string): Observable<any> {
    return this.http.get(`./assets/i18n/${lang}.json`).pipe(
      map((translations: any) => {
        this.translations = translations;
        this.currentLang = lang;

        // persist language into local storage
        localStorage.setItem('currentLang', lang);
        return translations;
      })
    );
  }

  translate(key: string): string {
    return this.translations[key] || key;
  }

  getCurrentLang(): string {
    return this.currentLang;
  }
}
