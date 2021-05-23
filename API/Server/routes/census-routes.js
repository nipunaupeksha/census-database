const express = require("express");
const router = express.Router();
const censusController = require("../Controllers/census-controller");

router.get("/getAllStates", censusController.getAllStates);
router.get("/getAllCounties", censusController.getAllCounties);
router.get("/getAllStatesCounties", censusController.getAllStateCounties);
router.get("/getAllCensusBlock", censusController.getAllCensusBlock);
router.get("/householdsNoInternet", censusController.houseHoldsNoInternet);
router.get(
  "/vehiclesAvailableOccupiedHousingUnits",
  censusController.vehiclesAvailableOccupiedHousingUnits
);
router.get(
  "/housingUnitsInStructures",
  censusController.housingUnitsInStructures
);
router.get("/mobilehomes", censusController.mobilehomes);
router.get(
  "/totalPersonsInHouseholds",
  censusController.totalPersonsInHouseholds
);
router.get("/totalPopulation", censusController.totalPopulation);
router.get("/popPovertyLevelDefined", censusController.popPovertyLevelDefined);
router.get("/civilainsUnemployed", censusController.civilainsUnemployed);
router.get("/notHighScoolGraduates", censusController.notHighScoolGraduates);
router.get(
  "/civilianNonInstitutionalizedPopulation",
  censusController.civilianNonInstitutionalizedPopulation
);
router.get(
  "/personAgesFiveThroughSeventeen",
  censusController.personAgesFiveThroughSeventeen
);
router.get(
  "/totalPopulationWithDisability",
  censusController.totalPopulationWithDisability
);
router.get(
  "/civilianNonInstitutionalizedPopulations",
  censusController.civilianNonInstitutionalizedPopulation_
);
router.get(
  "/aggregateHousholdIncome",
  censusController.aggregateHousholdIncome
);
router.get(
  "/englishSpeakingHousehold",
  censusController.englishSpeakingHousehold
);
router.get("/notUSCitizens", censusController.notUSCitizens);
router.get("/groupQuatersPopulation", censusController.groupQuatersPopulation);

module.exports = router;
