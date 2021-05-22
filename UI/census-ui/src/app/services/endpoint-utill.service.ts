import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class EndpointUtillService {
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
  });

  private BACKEND_URL = 'http://localhost:8080/';

  constructor(private http: HttpClient) {}

  public getBackendURL() {
    return this.BACKEND_URL;
  }

  public getAllStates() {
    return this.http
      .get(this.BACKEND_URL + 'census/getAllStates', { headers: this.headers })
      .pipe(map((res) => res));
  }

  public getAllCounties() {
    return this.http
      .get(this.BACKEND_URL + 'census/getAllCounties', { headers: this.headers })
      .pipe(map((res) => res));
  }

  public getAllStatesCouniesMap() {
    return this.http
      .get(this.BACKEND_URL + 'census/getAllStatesCounties', { headers: this.headers })
      .pipe(map((res) => res));
  }

  public householdsNoInternet() {
    return this.http
      .get(this.BACKEND_URL + 'census/householdsNoInternet', {
        headers: this.headers,
      })
      .pipe(map((res) => res));
  }

  public vehiclesAvailableOccupiedHousingUnits() {
    return this.http
      .get(this.BACKEND_URL + 'census/vehiclesAvailableOccupiedHousingUnits', {
        headers: this.headers,
      })
      .pipe(map((res) => res));
  }

  public housingUnitsInStructures() {
    return this.http
      .get(this.BACKEND_URL + 'census/housingUnitsInStructures', {
        headers: this.headers,
      })
      .pipe(map((res) => res));
  }

  public mobilehomes() {
    return this.http
      .get(this.BACKEND_URL + 'census/mobilehomes', { headers: this.headers })
      .pipe(map((res) => res));
  }

  public totalPersonsInHouseholds() {
    return this.http
      .get(this.BACKEND_URL + 'census/totalPersonsInHouseholds', {
        headers: this.headers,
      })
      .pipe(map((res) => res));
  }

  public totalPopulation() {
    return this.http
      .get(this.BACKEND_URL + 'census/totalPopulation', {
        headers: this.headers,
      })
      .pipe(map((res) => res));
  }

  public popPovertyLevelDefined() {
    return this.http
      .get(this.BACKEND_URL + 'census/popPovertyLevelDefined', {
        headers: this.headers,
      })
      .pipe(map((res) => res));
  }

  public civilainsUnemployed() {
    return this.http
      .get(this.BACKEND_URL + 'census/civilainsUnemployed', {
        headers: this.headers,
      })
      .pipe(map((res) => res));
  }

  public notHighScoolGraduates() {
    return this.http
      .get(this.BACKEND_URL + 'census/notHighScoolGraduates', {
        headers: this.headers,
      })
      .pipe(map((res) => res));
  }

  public civilianNonInstitutionalizedPopulation() {
    return this.http
      .get(this.BACKEND_URL + 'census/civilianNonInstitutionalizedPopulation', {
        headers: this.headers,
      })
      .pipe(map((res) => res));
  }

  public personAgesFiveThroughSeventeen() {
    return this.http
      .get(this.BACKEND_URL + 'census/personAgesFiveThroughSeventeen', {
        headers: this.headers,
      })
      .pipe(map((res) => res));
  }

  public totalPopulationWithDisability() {
    return this.http
      .get(this.BACKEND_URL + 'census/totalPopulationWithDisability', {
        headers: this.headers,
      })
      .pipe(map((res) => res));
  }

  public civilianNonInstitutionalizedPopulations() {
    return this.http
      .get(
        this.BACKEND_URL + 'census/civilianNonInstitutionalizedPopulations',
        { headers: this.headers }
      )
      .pipe(map((res) => res));
  }

  public aggregateHousholdIncome() {
    return this.http
      .get(this.BACKEND_URL + 'census/aggregateHousholdIncome', {
        headers: this.headers,
      })
      .pipe(map((res) => res));
  }
  public englishSpeakingHousehold() {
    return this.http
      .get(this.BACKEND_URL + 'census/englishSpeakingHousehold', {
        headers: this.headers,
      })
      .pipe(map((res) => res));
  }
  public notUSCitizens() {
    return this.http
      .get(this.BACKEND_URL + 'census/notUSCitizens', {
        headers: this.headers,
      })
      .pipe(map((res) => res));
  }
  public groupQuatersPopulation() {
    return this.http
      .get(this.BACKEND_URL + 'census/groupQuatersPopulation', {
        headers: this.headers,
      })
      .pipe(map((res) => res));
  }
}
