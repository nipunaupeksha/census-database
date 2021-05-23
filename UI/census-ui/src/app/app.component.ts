import { Component } from '@angular/core';
import { EndpointUtillService } from './services/endpoint-utill.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  // For 18 endpoints
  successLog = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ];

  constructor(private endpointUtillService: EndpointUtillService) {}
  getAllStates() {
    this.endpointUtillService.getAllStates().subscribe(
      (success) => {
        this.successLog[0] = true;
        console.log(success);
      },
      (error) => {
        this.successLog[0] = false;
        console.log(error);
      }
    );
  }

  getAllCounties() {
    this.endpointUtillService.getAllCounties().subscribe(
      (success) => {
        this.successLog[18] = true;
        console.log(success);
      },
      (error) => {
        this.successLog[18] = false;
        console.log(error);
      }
    );
  }

  getAllStatesCouniesMap() {
    this.endpointUtillService.getAllStatesCouniesMap().subscribe(
      (success) => {
        this.successLog[19] = true;
        console.log(success);
      },
      (error) => {
        this.successLog[19] = false;
        console.log(error);
      }
    );
  }
  getAllCountyBlockMap() {
    this.endpointUtillService.getAllCountyBlockMap().subscribe(
      (success) => {
        this.successLog[19] = true;
        console.log(success);
      },
      (error) => {
        this.successLog[19] = false;
        console.log(error);
      }
    );
  }

  householdsNoInternet() {
    this.endpointUtillService.householdsNoInternet().subscribe(
      (success) => {
        this.successLog[1] = true;
        console.log(success);
      },
      (error) => {
        this.successLog[1] = false;
        console.log(error);
      }
    );
  }

  vehiclesAvailableOccupiedHousingUnits() {
    this.endpointUtillService.vehiclesAvailableOccupiedHousingUnits().subscribe(
      (success) => {
        this.successLog[2] = true;
        console.log(success);
      },
      (error) => {
        this.successLog[2] = false;
        console.log(error);
      }
    );
  }

  housingUnitsInStructures() {
    this.endpointUtillService.housingUnitsInStructures().subscribe(
      (success) => {
        this.successLog[3] = true;
        console.log(success);
      },
      (error) => {
        this.successLog[3] = false;
        console.log(error);
      }
    );
  }

  mobilehomes() {
    this.endpointUtillService.mobilehomes().subscribe(
      (success) => {
        this.successLog[4] = true;
        console.log(success);
      },
      (error) => {
        this.successLog[4] = false;
        console.log(error);
      }
    );
  }

  totalPersonsInHouseholds() {
    this.endpointUtillService.totalPersonsInHouseholds().subscribe(
      (success) => {
        this.successLog[5] = true;
        console.log(success);
      },
      (error) => {
        this.successLog[5] = false;
        console.log(error);
      }
    );
  }

  totalPopulation() {
    this.endpointUtillService.totalPopulation().subscribe(
      (success) => {
        this.successLog[6] = true;
        console.log(success);
      },
      (error) => {
        this.successLog[6] = false;
        console.log(error);
      }
    );
  }

  popPovertyLevelDefined() {
    this.endpointUtillService.popPovertyLevelDefined().subscribe(
      (success) => {
        this.successLog[7] = true;
        console.log(success);
      },
      (error) => {
        this.successLog[7] = false;
        console.log(error);
      }
    );
  }

  civilainsUnemployed() {
    this.endpointUtillService.civilainsUnemployed().subscribe(
      (success) => {
        this.successLog[8] = true;
        console.log(success);
      },
      (error) => {
        this.successLog[8] = false;
        console.log(error);
      }
    );
  }

  notHighScoolGraduates() {
    this.endpointUtillService.notHighScoolGraduates().subscribe(
      (success) => {
        this.successLog[9] = true;
        console.log(success);
      },
      (error) => {
        this.successLog[9] = false;
        console.log(error);
      }
    );
  }

  civilianNonInstitutionalizedPopulation() {
    this.endpointUtillService
      .civilianNonInstitutionalizedPopulation()
      .subscribe(
        (success) => {
          this.successLog[10] = true;
          console.log(success);
        },
        (error) => {
          this.successLog[10] = false;
          console.log(error);
        }
      );
  }

  personAgesFiveThroughSeventeen() {
    this.endpointUtillService.personAgesFiveThroughSeventeen().subscribe(
      (success) => {
        this.successLog[11] = true;
        console.log(success);
      },
      (error) => {
        this.successLog[11] = false;
        console.log(error);
      }
    );
  }

  totalPopulationWithDisability() {
    this.endpointUtillService.totalPopulationWithDisability().subscribe(
      (success) => {
        this.successLog[12] = true;
        console.log(success);
      },
      (error) => {
        this.successLog[12] = false;
        console.log(error);
      }
    );
  }

  civilianNonInstitutionalizedPopulations() {
    this.endpointUtillService
      .civilianNonInstitutionalizedPopulations()
      .subscribe(
        (success) => {
          this.successLog[13] = true;
          console.log(success);
        },
        (error) => {
          this.successLog[13] = false;
          console.log(error);
        }
      );
  }

  aggregateHousholdIncome() {
    this.endpointUtillService.aggregateHousholdIncome().subscribe(
      (success) => {
        this.successLog[14] = true;
        console.log(success);
      },
      (error) => {
        this.successLog[14] = false;
        console.log(error);
      }
    );
  }

  englishSpeakingHousehold() {
    this.endpointUtillService.englishSpeakingHousehold().subscribe(
      (success) => {
        this.successLog[15] = true;
        console.log(success);
      },
      (error) => {
        this.successLog[15] = false;
        console.log(error);
      }
    );
  }

  notUSCitizens() {
    this.endpointUtillService.notUSCitizens().subscribe(
      (success) => {
        this.successLog[16] = true;
        console.log(success);
      },
      (error) => {
        this.successLog[16] = false;
        console.log(error);
      }
    );
  }
  groupQuatersPopulation() {
    this.endpointUtillService.groupQuatersPopulation().subscribe(
      (success) => {
        this.successLog[17] = true;
        console.log(success);
      },
      (error) => {
        this.successLog[17] = false;
        console.log(error);
      }
    );
  }
}
