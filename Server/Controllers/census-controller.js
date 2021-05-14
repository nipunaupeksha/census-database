const dbConfig = require("../../mysql-connection");
const https = require("https");

const CENSUS_KEY = "bfea2392b87db962a6204d335feef04c7c7899f4";

//Get All States
exports.getAllStates = function (req, res) {
  let createStateTable =
    "CREATE TABLE IF NOT EXISTS state(id int NOT NULL AUTO_INCREMENT, name VARCHAR(100),pop int(255),state int(255),country int(255),PRIMARY KEY (id))";

  https
    .get(
      "https://api.census.gov/data/2019/pep/charagegroups?get=NAME,POP&for=county:*&in=state:*&key=" +
        CENSUS_KEY,
      (resp) => {
        let data = "";

        resp.on("data", (chunk) => {
          data += chunk;
        });

        resp.on("end", () => {
          let censusData = JSON.parse(data);
          let insertQ = "INSERT INTO state(name,pop,state,country) values";
          let selectQ = "SELECT * from state";
          for (let i = 1; i < censusData.length; i++) {
            let ret = censusData[i][0].replace("'", "");
            insertQ =
              insertQ +
              "('" +
              ret +
              "'," +
              censusData[i][1] +
              "," +
              censusData[i][2] +
              "," +
              censusData[i][3] +
              "),";
          }
          insertQ = insertQ.substring(0, insertQ.length - 1);
          dbConfig.query(selectQ, function (err, result) {
            if (err) {
              dbConfig.query(createStateTable, function (error, res_create) {
                if (error) {
                  res.status(404).send({ success: false });
                } else {
                  console.log("STATE TABLE CREATED");
                  dbConfig.query(insertQ, function (error_insert, response) {
                    if (error_insert) {
                      console.log(error_insert);
                      res.status(404).send({ success: false });
                    } else {
                      res.status(200).send({ success: true });
                    }
                  });
                }
              });
            } else {
              if (result != null) {
                res.status(200).send({ success: true });
              } else {
                dbConfig.query(insertQ, function (error_insert, response) {
                  if (error_insert) {
                    console.log(error_insert);
                    res.status(404).send({ success: false });
                  } else {
                    res.status(200).send({ success: true });
                  }
                });
              }
            }
          });
        });
      }
    )
    .on("error", (err) => {
      console.log("Error: " + err.message);
    });
};

//MOE - Households that have no Internet access
exports.houseHoldsNoInternet = function (req, res) {
  //HHD_No_Internet_ACSMOE_14_18
  let createStateTable =
    "CREATE TABLE IF NOT EXISTS HHD_No_Internet_ACSMOE_14_18(noofhouseholds int(255),state int(255),PRIMARY KEY (state))";

  https
    .get(
      "https://api.census.gov/data/2020/pdb/statecounty?get=HHD_No_Internet_ACSMOE_14_18&for=state:*&key=" +
        CENSUS_KEY,
      (resp) => {
        let data = "";

        // A chunk of data has been received.
        resp.on("data", (chunk) => {
          data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on("end", () => {
          let censusData = JSON.parse(data);
          let insertQ =
            "INSERT INTO HHD_No_Internet_ACSMOE_14_18(noofhouseholds,state) values";
          let selectQ = "SELECT * from HHD_No_Internet_ACSMOE_14_18";
          for (let i = 1; i < censusData.length; i++) {
            insertQ =
              insertQ + "(" + censusData[i][0] + "," + censusData[i][1] + "),";
          }
          insertQ = insertQ.substring(0, insertQ.length - 1);
          dbConfig.query(selectQ, function (err, result) {
            if (err) {
              dbConfig.query(createStateTable, function (error, res_create) {
                if (error) {
                  res.status(404).send({ success: false });
                } else {
                  console.log("STATE TABLE CREATED");
                  dbConfig.query(insertQ, function (error_insert, response) {
                    if (error_insert) {
                      console.log(error_insert);
                      res.status(404).send({ success: false });
                    } else {
                      res.status(200).send({ success: true });
                    }
                  });
                }
              });
            } else {
              if (result != null) {
                res.status(200).send({ success: true });
              } else {
                dbConfig.query(insertQ, function (error_insert, response) {
                  if (error_insert) {
                    console.log(error_insert);
                    res.status(404).send({ success: false });
                  } else {
                    res.status(200).send({ success: true });
                  }
                });
              }
            }
          });
        });
      }
    )
    .on("error", (err) => {
      console.log("Error: " + err.message);
    });
};

//Estimate!!VEHICLES AVAILABLE!!Occupied housing units!!None
exports.vehiclesAvailableOccupiedHousingUnits = function (req, res) {
  //S0201_284E
  let createStateTable =
    "CREATE TABLE IF NOT EXISTS S0201_284E( id int NOT NULL AUTO_INCREMENT,name VARCHAR(100),estimate int(255),PRIMARY KEY (id))";

  https
    .get(
      "https://api.census.gov/data/2019/acs/acs1/spp?get=NAME,S0201_284E&key=" +
        CENSUS_KEY,
      (resp) => {
        let data = "";

        resp.on("data", (chunk) => {
          data += chunk;
        });

        resp.on("end", () => {
          let censusData = JSON.parse(data);
          let insertQ = "INSERT INTO S0201_284E(name,estimate) values";
          let selectQ = "SELECT * from S0201_284E";
          for (let i = 1; i < censusData.length; i++) {
            let ret = censusData[i][0].replace("'", "");
            insertQ = insertQ + "('" + ret + "'," + censusData[i][1] + "),";
          }
          insertQ = insertQ.substring(0, insertQ.length - 1);
          dbConfig.query(selectQ, function (err, result) {
            if (err) {
              dbConfig.query(createStateTable, function (error, res_create) {
                if (error) {
                  res.status(404).send({ success: false });
                } else {
                  console.log("S0201_284E TABLE CREATED");
                  dbConfig.query(insertQ, function (error_insert, response) {
                    if (error_insert) {
                      console.log(error_insert);
                      res.status(404).send({ success: false });
                    } else {
                      res.status(200).send({ success: true });
                    }
                  });
                }
              });
            } else {
              if (result != null) {
                res.status(200).send({ success: true });
              } else {
                dbConfig.query(insertQ, function (error_insert, response) {
                  if (error_insert) {
                    console.log(error_insert);
                    res.status(404).send({ success: false });
                  } else {
                    res.status(200).send({ success: true });
                  }
                });
              }
            }
          });
        });
      }
    )
    .on("error", (err) => {
      console.log("Error: " + err.message);
    });
};

//MOE - Housing units in structures containing two to nine housing units
exports.housingUnitsInStructures = function (req, res) {
  //MLT_U2_9_STRC_ACSMOE_14_18
  let createStateTable =
    "CREATE TABLE IF NOT EXISTS MLT_U2_9_STRC_ACSMOE_14_18( id int NOT NULL AUTO_INCREMENT,housingUnitsInStructures int(255),state int(255),country int(255),PRIMARY KEY (id))";

  https
    .get(
      "https://api.census.gov/data/2020/pdb/statecounty?get=MLT_U2_9_STRC_ACSMOE_14_18&for=county:*&in=state:*&key=" +
        CENSUS_KEY,
      (resp) => {
        let data = "";

        resp.on("data", (chunk) => {
          data += chunk;
        });

        resp.on("end", () => {
          let censusData = JSON.parse(data);
          let insertQ =
            "INSERT INTO MLT_U2_9_STRC_ACSMOE_14_18(housingUnitsInStructures,state,country) values";
          let selectQ = "SELECT * from MLT_U2_9_STRC_ACSMOE_14_18";
          for (let i = 1; i < censusData.length; i++) {
            insertQ =
              insertQ +
              "(" +
              censusData[i][0] +
              "," +
              censusData[i][1] +
              "," +
              censusData[i][2] +
              "),";
          }
          insertQ = insertQ.substring(0, insertQ.length - 1);
          dbConfig.query(selectQ, function (err, result) {
            if (err) {
              dbConfig.query(createStateTable, function (error, res_create) {
                if (error) {
                  res.status(404).send({ success: false });
                } else {
                  console.log("MLT_U2_9_STRC_ACSMOE_14_18 TABLE CREATED");
                  dbConfig.query(insertQ, function (error_insert, response) {
                    if (error_insert) {
                      console.log(error_insert);
                      res.status(404).send({ success: false });
                    } else {
                      res.status(200).send({ success: true });
                    }
                  });
                }
              });
            } else {
              if (result != null) {
                res.status(200).send({ success: true });
              } else {
                dbConfig.query(insertQ, function (error_insert, response) {
                  if (error_insert) {
                    console.log(error_insert);
                    res.status(404).send({ success: false });
                  } else {
                    res.status(200).send({ success: true });
                  }
                });
              }
            }
          });
        });
      }
    )
    .on("error", (err) => {
      console.log("Error: " + err.message);
    });
};

//MOE - Mobile Homes
exports.mobilehomes = function (req, res) {
  //Mobile_Homes_ACSMOE_14_18
  let createStateTable =
    "CREATE TABLE IF NOT EXISTS Mobile_Homes_ACSMOE_14_18( id int NOT NULL AUTO_INCREMENT,mobilehomes int(255),state int(255),country int(255),PRIMARY KEY (id))";

  https
    .get(
      "https://api.census.gov/data/2020/pdb/statecounty?get=Mobile_Homes_ACSMOE_14_18&for=county:*&in=state:*&key=" +
        CENSUS_KEY,
      (resp) => {
        let data = "";

        resp.on("data", (chunk) => {
          data += chunk;
        });

        resp.on("end", () => {
          let censusData = JSON.parse(data);
          let insertQ =
            "INSERT INTO Mobile_Homes_ACSMOE_14_18(mobilehomes,state,country) values";
          let selectQ = "SELECT * from Mobile_Homes_ACSMOE_14_18";
          for (let i = 1; i < censusData.length; i++) {
            insertQ =
              insertQ +
              "(" +
              censusData[i][0] +
              "," +
              censusData[i][1] +
              "," +
              censusData[i][2] +
              "),";
          }
          insertQ = insertQ.substring(0, insertQ.length - 1);
          dbConfig.query(selectQ, function (err, result) {
            if (err) {
              dbConfig.query(createStateTable, function (error, res_create) {
                if (error) {
                  res.status(404).send({ success: false });
                } else {
                  console.log("Mobile_Homes_ACSMOE_14_18 TABLE CREATED");
                  dbConfig.query(insertQ, function (error_insert, response) {
                    if (error_insert) {
                      console.log(error_insert);
                      res.status(404).send({ success: false });
                    } else {
                      res.status(200).send({ success: true });
                    }
                  });
                }
              });
            } else {
              if (result != null) {
                res.status(200).send({ success: true });
              } else {
                dbConfig.query(insertQ, function (error_insert, response) {
                  if (error_insert) {
                    console.log(error_insert);
                    res.status(404).send({ success: false });
                  } else {
                    res.status(200).send({ success: true });
                  }
                });
              }
            }
          });
        });
      }
    )
    .on("error", (err) => {
      console.log("Error: " + err.message);
    });
};

//MOE - Total Persons in households
exports.totalPersonsInHouseholds = function (req, res) {
  //Tot_Prns_in_HHD_ACSMOE_14_18
  let createStateTable =
    "CREATE TABLE IF NOT EXISTS Tot_Prns_in_HHD_ACSMOE_14_18( id int NOT NULL AUTO_INCREMENT,personsinhousehold int(255),state int(255),country int(255),PRIMARY KEY (id))";

  https
    .get(
      "https://api.census.gov/data/2020/pdb/statecounty?get=Tot_Prns_in_HHD_ACSMOE_14_18&for=county:*&in=state:*&key=" +
        CENSUS_KEY,
      (resp) => {
        let data = "";

        resp.on("data", (chunk) => {
          data += chunk;
        });

        resp.on("end", () => {
          let censusData = JSON.parse(data);
          let insertQ =
            "INSERT INTO Tot_Prns_in_HHD_ACSMOE_14_18(personsinhousehold,state,country) values";
          let selectQ = "SELECT * from Tot_Prns_in_HHD_ACSMOE_14_18";
          for (let i = 1; i < censusData.length; i++) {
            insertQ =
              insertQ +
              "(" +
              censusData[i][0] +
              "," +
              censusData[i][1] +
              "," +
              censusData[i][2] +
              "),";
          }
          insertQ = insertQ.substring(0, insertQ.length - 1);
          dbConfig.query(selectQ, function (err, result) {
            if (err) {
              dbConfig.query(createStateTable, function (error, res_create) {
                if (error) {
                  res.status(404).send({ success: false });
                } else {
                  console.log("Tot_Prns_in_HHD_ACSMOE_14_18 TABLE CREATED");
                  dbConfig.query(insertQ, function (error_insert, response) {
                    if (error_insert) {
                      console.log(error_insert);
                      res.status(404).send({ success: false });
                    } else {
                      res.status(200).send({ success: true });
                    }
                  });
                }
              });
            } else {
              if (result != null) {
                res.status(200).send({ success: true });
              } else {
                dbConfig.query(insertQ, function (error_insert, response) {
                  if (error_insert) {
                    console.log(error_insert);
                    res.status(404).send({ success: false });
                  } else {
                    res.status(200).send({ success: true });
                  }
                });
              }
            }
          });
        });
      }
    )
    .on("error", (err) => {
      console.log("Error: " + err.message);
    });
};

//MOE - Total Population
exports.totalPopulation = function (req, res) {
  //Tot_Population_ACSMOE_14_18
  let createStateTable =
    "CREATE TABLE IF NOT EXISTS Tot_Population_ACSMOE_14_18( id int NOT NULL AUTO_INCREMENT,totalPopulation int(255),state int(255),country int(255),PRIMARY KEY (id))";

  https
    .get(
      "https://api.census.gov/data/2020/pdb/statecounty?get=Tot_Population_ACSMOE_14_18&for=county:*&in=state:*&key=" +
        CENSUS_KEY,
      (resp) => {
        let data = "";

        resp.on("data", (chunk) => {
          data += chunk;
        });

        resp.on("end", () => {
          let censusData = JSON.parse(data);
          let insertQ =
            "INSERT INTO Tot_Population_ACSMOE_14_18(totalPopulation,state,country) values";
          let selectQ = "SELECT * from Tot_Population_ACSMOE_14_18";
          for (let i = 1; i < censusData.length; i++) {
            insertQ =
              insertQ +
              "(" +
              censusData[i][0] +
              "," +
              censusData[i][1] +
              "," +
              censusData[i][2] +
              "),";
          }
          insertQ = insertQ.substring(0, insertQ.length - 1);
          dbConfig.query(selectQ, function (err, result) {
            if (err) {
              dbConfig.query(createStateTable, function (error, res_create) {
                if (error) {
                  res.status(404).send({ success: false });
                } else {
                  console.log("Tot_Population_ACSMOE_14_18 TABLE CREATED");
                  dbConfig.query(insertQ, function (error_insert, response) {
                    if (error_insert) {
                      console.log(error_insert);
                      res.status(404).send({ success: false });
                    } else {
                      res.status(200).send({ success: true });
                    }
                  });
                }
              });
            } else {
              if (result != null) {
                res.status(200).send({ success: true });
              } else {
                dbConfig.query(insertQ, function (error_insert, response) {
                  if (error_insert) {
                    console.log(error_insert);
                    res.status(404).send({ success: false });
                  } else {
                    res.status(200).send({ success: true });
                  }
                });
              }
            }
          });
        });
      }
    )
    .on("error", (err) => {
      console.log("Error: " + err.message);
    });
};

//Population for whom poverty level is determined (denominator for persons blw pov.) in the ACS
exports.popPovertyLevelDefined = function (req, res) {
  //Pov_Univ_ACS_14_18
  let createStateTable =
    "CREATE TABLE IF NOT EXISTS Pov_Univ_ACS_14_18( id int NOT NULL AUTO_INCREMENT,population int(255),state int(255),country int(255),PRIMARY KEY (id))";

  https
    .get(
      "https://api.census.gov/data/2020/pdb/statecounty?get=Pov_Univ_ACS_14_18&for=county:*&in=state:*&key=" +
        CENSUS_KEY,
      (resp) => {
        let data = "";

        resp.on("data", (chunk) => {
          data += chunk;
        });

        resp.on("end", () => {
          let censusData = JSON.parse(data);
          let insertQ =
            "INSERT INTO Pov_Univ_ACS_14_18(population,state,country) values";
          let selectQ = "SELECT * from Pov_Univ_ACS_14_18";
          for (let i = 1; i < censusData.length; i++) {
            insertQ =
              insertQ +
              "(" +
              censusData[i][0] +
              "," +
              censusData[i][1] +
              "," +
              censusData[i][2] +
              "),";
          }
          insertQ = insertQ.substring(0, insertQ.length - 1);
          dbConfig.query(selectQ, function (err, result) {
            if (err) {
              dbConfig.query(createStateTable, function (error, res_create) {
                if (error) {
                  res.status(404).send({ success: false });
                } else {
                  console.log("Pov_Univ_ACS_14_18 TABLE CREATED");
                  dbConfig.query(insertQ, function (error_insert, response) {
                    if (error_insert) {
                      console.log(error_insert);
                      res.status(404).send({ success: false });
                    } else {
                      res.status(200).send({ success: true });
                    }
                  });
                }
              });
            } else {
              if (result != null) {
                res.status(200).send({ success: true });
              } else {
                dbConfig.query(insertQ, function (error_insert, response) {
                  if (error_insert) {
                    console.log(error_insert);
                    res.status(404).send({ success: false });
                  } else {
                    res.status(200).send({ success: true });
                  }
                });
              }
            }
          });
        });
      }
    )
    .on("error", (err) => {
      console.log("Error: " + err.message);
    });
};

//MOE - Civilians aged 16 years and over and unemployed
exports.civilainsUnemployed = function (req, res) {
  //Civ_unemp_16plus_ACSMOE_14_18
  let createStateTable =
    "CREATE TABLE IF NOT EXISTS Civ_unemp_16plus_ACSMOE_14_18( id int NOT NULL AUTO_INCREMENT,civilians int(255),state int(255),country int(255),PRIMARY KEY (id))";

  https
    .get(
      "https://api.census.gov/data/2020/pdb/statecounty?get=Civ_unemp_16plus_ACSMOE_14_18&for=county:*&in=state:*&key=" +
        CENSUS_KEY,
      (resp) => {
        let data = "";

        resp.on("data", (chunk) => {
          data += chunk;
        });

        resp.on("end", () => {
          let censusData = JSON.parse(data);
          let insertQ =
            "INSERT INTO Civ_unemp_16plus_ACSMOE_14_18(civilians,state,country) values";
          let selectQ = "SELECT * from Civ_unemp_16plus_ACSMOE_14_18";
          for (let i = 1; i < censusData.length; i++) {
            insertQ =
              insertQ +
              "(" +
              censusData[i][0] +
              "," +
              censusData[i][1] +
              "," +
              censusData[i][2] +
              "),";
          }
          insertQ = insertQ.substring(0, insertQ.length - 1);
          dbConfig.query(selectQ, function (err, result) {
            if (err) {
              dbConfig.query(createStateTable, function (error, res_create) {
                if (error) {
                  res.status(404).send({ success: false });
                } else {
                  console.log("Civ_unemp_16plus_ACSMOE_14_18 TABLE CREATED");
                  dbConfig.query(insertQ, function (error_insert, response) {
                    if (error_insert) {
                      console.log(error_insert);
                      res.status(404).send({ success: false });
                    } else {
                      res.status(200).send({ success: true });
                    }
                  });
                }
              });
            } else {
              if (result != null) {
                res.status(200).send({ success: true });
              } else {
                dbConfig.query(insertQ, function (error_insert, response) {
                  if (error_insert) {
                    console.log(error_insert);
                    res.status(404).send({ success: false });
                  } else {
                    res.status(200).send({ success: true });
                  }
                });
              }
            }
          });
        });
      }
    )
    .on("error", (err) => {
      console.log("Error: " + err.message);
    });
};

//MOE - Number of people 25 years old and over who are not high school graduates
exports.notHighScoolGraduates = function (req, res) {
  //Not_HS_Grad_ACSMOE_14_18
  let createStateTable =
    "CREATE TABLE IF NOT EXISTS Not_HS_Grad_ACSMOE_14_18( id int NOT NULL AUTO_INCREMENT,people int(255),state int(255),country int(255),PRIMARY KEY (id))";

  https
    .get(
      "https://api.census.gov/data/2020/pdb/statecounty?get=Not_HS_Grad_ACSMOE_14_18&for=county:*&in=state:*&key=" +
        CENSUS_KEY,
      (resp) => {
        let data = "";

        resp.on("data", (chunk) => {
          data += chunk;
        });

        resp.on("end", () => {
          let censusData = JSON.parse(data);
          let insertQ =
            "INSERT INTO Not_HS_Grad_ACSMOE_14_18(people,state,country) values";
          let selectQ = "SELECT * from Not_HS_Grad_ACSMOE_14_18";
          for (let i = 1; i < censusData.length; i++) {
            insertQ =
              insertQ +
              "(" +
              censusData[i][0] +
              "," +
              censusData[i][1] +
              "," +
              censusData[i][2] +
              "),";
          }
          insertQ = insertQ.substring(0, insertQ.length - 1);
          dbConfig.query(selectQ, function (err, result) {
            if (err) {
              dbConfig.query(createStateTable, function (error, res_create) {
                if (error) {
                  res.status(404).send({ success: false });
                } else {
                  console.log("Not_HS_Grad_ACSMOE_14_18 TABLE CREATED");
                  dbConfig.query(insertQ, function (error_insert, response) {
                    if (error_insert) {
                      console.log(error_insert);
                      res.status(404).send({ success: false });
                    } else {
                      res.status(200).send({ success: true });
                    }
                  });
                }
              });
            } else {
              if (result != null) {
                res.status(200).send({ success: true });
              } else {
                dbConfig.query(insertQ, function (error_insert, response) {
                  if (error_insert) {
                    console.log(error_insert);
                    res.status(404).send({ success: false });
                  } else {
                    res.status(200).send({ success: true });
                  }
                });
              }
            }
          });
        });
      }
    )
    .on("error", (err) => {
      console.log("Error: " + err.message);
    });
};

//MOE - Civilian noninstitutionalized population aged 65 and over
exports.civilianNonInstitutionalizedPopulation = function (req, res) {
  //Civ_noninst_pop_65P_ACSMOE_14_18
  let createStateTable =
    "CREATE TABLE IF NOT EXISTS Civ_noninst_pop_65P_ACSMOE_14_18( id int NOT NULL AUTO_INCREMENT,population int(255),state int(255),country int(255),PRIMARY KEY (id))";

  https
    .get(
      "https://api.census.gov/data/2020/pdb/statecounty?get=Civ_noninst_pop_65P_ACSMOE_14_18&for=county:*&in=state:*&key=" +
        CENSUS_KEY,
      (resp) => {
        let data = "";

        resp.on("data", (chunk) => {
          data += chunk;
        });

        resp.on("end", () => {
          let censusData = JSON.parse(data);
          let insertQ =
            "INSERT INTO Civ_noninst_pop_65P_ACSMOE_14_18(population,state,country) values";
          let selectQ = "SELECT * from Civ_noninst_pop_65P_ACSMOE_14_18";
          for (let i = 1; i < censusData.length; i++) {
            insertQ =
              insertQ +
              "(" +
              censusData[i][0] +
              "," +
              censusData[i][1] +
              "," +
              censusData[i][2] +
              "),";
          }
          insertQ = insertQ.substring(0, insertQ.length - 1);
          dbConfig.query(selectQ, function (err, result) {
            if (err) {
              dbConfig.query(createStateTable, function (error, res_create) {
                if (error) {
                  res.status(404).send({ success: false });
                } else {
                  console.log("Civ_noninst_pop_65P_ACSMOE_14_18 TABLE CREATED");
                  dbConfig.query(insertQ, function (error_insert, response) {
                    if (error_insert) {
                      console.log(error_insert);
                      res.status(404).send({ success: false });
                    } else {
                      res.status(200).send({ success: true });
                    }
                  });
                }
              });
            } else {
              if (result != null) {
                res.status(200).send({ success: true });
              } else {
                dbConfig.query(insertQ, function (error_insert, response) {
                  if (error_insert) {
                    console.log(error_insert);
                    res.status(404).send({ success: false });
                  } else {
                    res.status(200).send({ success: true });
                  }
                });
              }
            }
          });
        });
      }
    )
    .on("error", (err) => {
      console.log("Error: " + err.message);
    });
};

//MOE - Persons ages 5 through 17
exports.personAgesFiveThroughSeventeen = function (req, res) {
  //Pop_5_17_ACSMOE_14_18
  let createStateTable =
    "CREATE TABLE IF NOT EXISTS Pop_5_17_ACSMOE_14_18( id int NOT NULL AUTO_INCREMENT,people int(255),state int(255),country int(255),PRIMARY KEY (id))";

  https
    .get(
      "https://api.census.gov/data/2020/pdb/statecounty?get=Pop_5_17_ACSMOE_14_18&for=county:*&in=state:*&key=" +
        CENSUS_KEY,
      (resp) => {
        let data = "";

        resp.on("data", (chunk) => {
          data += chunk;
        });

        resp.on("end", () => {
          let censusData = JSON.parse(data);
          let insertQ =
            "INSERT INTO Pop_5_17_ACSMOE_14_18(people,state,country) values";
          let selectQ = "SELECT * from Pop_5_17_ACSMOE_14_18";
          for (let i = 1; i < censusData.length; i++) {
            insertQ =
              insertQ +
              "(" +
              censusData[i][0] +
              "," +
              censusData[i][1] +
              "," +
              censusData[i][2] +
              "),";
          }
          insertQ = insertQ.substring(0, insertQ.length - 1);
          dbConfig.query(selectQ, function (err, result) {
            if (err) {
              dbConfig.query(createStateTable, function (error, res_create) {
                if (error) {
                  res.status(404).send({ success: false });
                } else {
                  console.log("Pop_5_17_ACSMOE_14_18 TABLE CREATED");
                  dbConfig.query(insertQ, function (error_insert, response) {
                    if (error_insert) {
                      console.log(error_insert);
                      res.status(404).send({ success: false });
                    } else {
                      res.status(200).send({ success: true });
                    }
                  });
                }
              });
            } else {
              if (result != null) {
                res.status(200).send({ success: true });
              } else {
                dbConfig.query(insertQ, function (error_insert, response) {
                  if (error_insert) {
                    console.log(error_insert);
                    res.status(404).send({ success: false });
                  } else {
                    res.status(200).send({ success: true });
                  }
                });
              }
            }
          });
        });
      }
    )
    .on("error", (err) => {
      console.log("Error: " + err.message);
    });
};

//MOE - Total population with a disability
exports.totalPopulationWithDisability = function (req, res) {
  //Pop_Disabled_ACSMOE_14_18
  let createStateTable =
    "CREATE TABLE IF NOT EXISTS Pop_Disabled_ACSMOE_14_18( id int NOT NULL AUTO_INCREMENT,population int(255),state int(255),country int(255),PRIMARY KEY (id))";

  https
    .get(
      "https://api.census.gov/data/2020/pdb/statecounty?get=Pop_Disabled_ACSMOE_14_18&for=county:*&in=state:*&key=" +
        CENSUS_KEY,
      (resp) => {
        let data = "";

        resp.on("data", (chunk) => {
          data += chunk;
        });

        resp.on("end", () => {
          let censusData = JSON.parse(data);
          let insertQ =
            "INSERT INTO Pop_Disabled_ACSMOE_14_18(population,state,country) values";
          let selectQ = "SELECT * from Pop_Disabled_ACSMOE_14_18";
          for (let i = 1; i < censusData.length; i++) {
            insertQ =
              insertQ +
              "(" +
              censusData[i][0] +
              "," +
              censusData[i][1] +
              "," +
              censusData[i][2] +
              "),";
          }
          insertQ = insertQ.substring(0, insertQ.length - 1);
          dbConfig.query(selectQ, function (err, result) {
            if (err) {
              dbConfig.query(createStateTable, function (error, res_create) {
                if (error) {
                  res.status(404).send({ success: false });
                } else {
                  console.log("Pop_Disabled_ACSMOE_14_18 TABLE CREATED");
                  dbConfig.query(insertQ, function (error_insert, response) {
                    if (error_insert) {
                      console.log(error_insert);
                      res.status(404).send({ success: false });
                    } else {
                      res.status(200).send({ success: true });
                    }
                  });
                }
              });
            } else {
              if (result != null) {
                res.status(200).send({ success: true });
              } else {
                dbConfig.query(insertQ, function (error_insert, response) {
                  if (error_insert) {
                    console.log(error_insert);
                    res.status(404).send({ success: false });
                  } else {
                    res.status(200).send({ success: true });
                  }
                });
              }
            }
          });
        });
      }
    )
    .on("error", (err) => {
      console.log("Error: " + err.message);
    });
};

//MOE - Civilian noninstitutionalized population
exports.civilianNonInstitutionalizedPopulation_ = function (req, res) {
  //Civ_Noninst_Pop_ACSMOE_14_18
  let createStateTable =
    "CREATE TABLE IF NOT EXISTS Civ_Noninst_Pop_ACSMOE_14_18( id int NOT NULL AUTO_INCREMENT,population int(255),state int(255),country int(255),PRIMARY KEY (id))";

  https
    .get(
      "https://api.census.gov/data/2020/pdb/statecounty?get=Civ_Noninst_Pop_ACSMOE_14_18&for=county:*&in=state:*&key=" +
        CENSUS_KEY,
      (resp) => {
        let data = "";

        resp.on("data", (chunk) => {
          data += chunk;
        });

        resp.on("end", () => {
          let censusData = JSON.parse(data);
          let insertQ =
            "INSERT INTO Civ_Noninst_Pop_ACSMOE_14_18(population,state,country) values";
          let selectQ = "SELECT * from Civ_Noninst_Pop_ACSMOE_14_18";
          for (let i = 1; i < censusData.length; i++) {
            insertQ =
              insertQ +
              "(" +
              censusData[i][0] +
              "," +
              censusData[i][1] +
              "," +
              censusData[i][2] +
              "),";
          }
          insertQ = insertQ.substring(0, insertQ.length - 1);
          dbConfig.query(selectQ, function (err, result) {
            if (err) {
              dbConfig.query(createStateTable, function (error, res_create) {
                if (error) {
                  res.status(404).send({ success: false });
                } else {
                  console.log("Civ_Noninst_Pop_ACSMOE_14_18 TABLE CREATED");
                  dbConfig.query(insertQ, function (error_insert, response) {
                    if (error_insert) {
                      console.log(error_insert);
                      res.status(404).send({ success: false });
                    } else {
                      res.status(200).send({ success: true });
                    }
                  });
                }
              });
            } else {
              if (result != null) {
                res.status(200).send({ success: true });
              } else {
                dbConfig.query(insertQ, function (error_insert, response) {
                  if (error_insert) {
                    console.log(error_insert);
                    res.status(404).send({ success: false });
                  } else {
                    res.status(200).send({ success: true });
                  }
                });
              }
            }
          });
        });
      }
    )
    .on("error", (err) => {
      console.log("Error: " + err.message);
    });
};

//MOE - Aggregate Household Income
exports.aggregateHousholdIncome = function (req, res) {
  //Aggregate_HH_INC_ACSMOE_14_18
  let createStateTable =
    "CREATE TABLE IF NOT EXISTS Aggregate_HH_INC_ACSMOE_14_18( id int NOT NULL AUTO_INCREMENT,income VARCHAR(255),state int(255),country int(255),PRIMARY KEY (id))";

  https
    .get(
      "https://api.census.gov/data/2020/pdb/statecounty?get=Aggregate_HH_INC_ACSMOE_14_18&for=county:*&in=state:*&key=" +
        CENSUS_KEY,
      (resp) => {
        let data = "";

        resp.on("data", (chunk) => {
          data += chunk;
        });

        resp.on("end", () => {
          let censusData = JSON.parse(data);
          let insertQ =
            "INSERT INTO Aggregate_HH_INC_ACSMOE_14_18(income,state,country) values";
          let selectQ = "SELECT * from Aggregate_HH_INC_ACSMOE_14_18";
          for (let i = 1; i < censusData.length; i++) {
            insertQ =
              insertQ +
              "('" +
              censusData[i][0] +
              "'," +
              censusData[i][1] +
              "," +
              censusData[i][2] +
              "),";
          }
          insertQ = insertQ.substring(0, insertQ.length - 1);
          dbConfig.query(selectQ, function (err, result) {
            if (err) {
              dbConfig.query(createStateTable, function (error, res_create) {
                if (error) {
                  res.status(404).send({ success: false });
                } else {
                  console.log("Aggregate_HH_INC_ACSMOE_14_18 TABLE CREATED");
                  dbConfig.query(insertQ, function (error_insert, response) {
                    if (error_insert) {
                      console.log(error_insert);
                      res.status(404).send({ success: false });
                    } else {
                      res.status(200).send({ success: true });
                    }
                  });
                }
              });
            } else {
              if (result != null) {
                res.status(200).send({ success: true });
              } else {
                dbConfig.query(insertQ, function (error_insert, response) {
                  if (error_insert) {
                    console.log(error_insert);
                    res.status(404).send({ success: false });
                  } else {
                    res.status(200).send({ success: true });
                  }
                });
              }
            }
          });
        });
      }
    )
    .on("error", (err) => {
      console.log("Error: " + err.message);
    });
};

//Other - Limited English speaking household (Use Tot ACS Occ HU as denominator) in the ACS
exports.englishSpeakingHousehold = function (req, res) {
  //ENG_VW_OTHER_ACS_14_18
  let createStateTable =
    "CREATE TABLE IF NOT EXISTS ENG_VW_OTHER_ACS_14_18( id int NOT NULL AUTO_INCREMENT,speakinghousehold int(255),state int(255),country int(255),PRIMARY KEY (id))";

  https
    .get(
      "https://api.census.gov/data/2020/pdb/statecounty?get=ENG_VW_OTHER_ACS_14_18&for=county:*&in=state:*&key=" +
        CENSUS_KEY,
      (resp) => {
        let data = "";

        resp.on("data", (chunk) => {
          data += chunk;
        });

        resp.on("end", () => {
          let censusData = JSON.parse(data);
          let insertQ =
            "INSERT INTO ENG_VW_OTHER_ACS_14_18(speakinghousehold,state,country) values";
          let selectQ = "SELECT * from ENG_VW_OTHER_ACS_14_18";
          for (let i = 1; i < censusData.length; i++) {
            insertQ =
              insertQ +
              "(" +
              censusData[i][0] +
              "," +
              censusData[i][1] +
              "," +
              censusData[i][2] +
              "),";
          }
          insertQ = insertQ.substring(0, insertQ.length - 1);
          dbConfig.query(selectQ, function (err, result) {
            if (err) {
              dbConfig.query(createStateTable, function (error, res_create) {
                if (error) {
                  res.status(404).send({ success: false });
                } else {
                  console.log("ENG_VW_OTHER_ACS_14_18 TABLE CREATED");
                  dbConfig.query(insertQ, function (error_insert, response) {
                    if (error_insert) {
                      console.log(error_insert);
                      res.status(404).send({ success: false });
                    } else {
                      res.status(200).send({ success: true });
                    }
                  });
                }
              });
            } else {
              if (result != null) {
                res.status(200).send({ success: true });
              } else {
                dbConfig.query(insertQ, function (error_insert, response) {
                  if (error_insert) {
                    console.log(error_insert);
                    res.status(404).send({ success: false });
                  } else {
                    res.status(200).send({ success: true });
                  }
                });
              }
            }
          });
        });
      }
    )
    .on("error", (err) => {
      console.log("Error: " + err.message);
    });
};

//MOE - Persons who are not US citizens at birth
exports.notUSCitizens = function (req, res) {
  //Born_foreign_ACSMOE_14_18
  let createStateTable =
    "CREATE TABLE IF NOT EXISTS Born_foreign_ACSMOE_14_18( id int NOT NULL AUTO_INCREMENT,people int(255),state int(255),country int(255),PRIMARY KEY (id))";

  https
    .get(
      "https://api.census.gov/data/2020/pdb/statecounty?get=Born_foreign_ACSMOE_14_18&for=county:*&in=state:*&key=" +
        CENSUS_KEY,
      (resp) => {
        let data = "";

        resp.on("data", (chunk) => {
          data += chunk;
        });

        resp.on("end", () => {
          let censusData = JSON.parse(data);
          let insertQ =
            "INSERT INTO Born_foreign_ACSMOE_14_18(people,state,country) values";
          let selectQ = "SELECT * from Born_foreign_ACSMOE_14_18";
          for (let i = 1; i < censusData.length; i++) {
            insertQ =
              insertQ +
              "(" +
              censusData[i][0] +
              "," +
              censusData[i][1] +
              "," +
              censusData[i][2] +
              "),";
          }
          insertQ = insertQ.substring(0, insertQ.length - 1);
          dbConfig.query(selectQ, function (err, result) {
            if (err) {
              dbConfig.query(createStateTable, function (error, res_create) {
                if (error) {
                  res.status(404).send({ success: false });
                } else {
                  console.log("Born_foreign_ACSMOE_14_18 TABLE CREATED");
                  dbConfig.query(insertQ, function (error_insert, response) {
                    if (error_insert) {
                      console.log(error_insert);
                      res.status(404).send({ success: false });
                    } else {
                      res.status(200).send({ success: true });
                    }
                  });
                }
              });
            } else {
              if (result != null) {
                res.status(200).send({ success: true });
              } else {
                dbConfig.query(insertQ, function (error_insert, response) {
                  if (error_insert) {
                    console.log(error_insert);
                    res.status(404).send({ success: false });
                  } else {
                    res.status(200).send({ success: true });
                  }
                });
              }
            }
          });
        });
      }
    )
    .on("error", (err) => {
      console.log("Error: " + err.message);
    });
};

//Total Group Quarters Population in the 2010 Census
exports.groupQuatersPopulation = function (req, res) {
  //Born_foreign_ACSMOE_14_18
  let createStateTable =
    "CREATE TABLE IF NOT EXISTS Tot_GQ_CEN_2010( id int NOT NULL AUTO_INCREMENT,population int(255),state int(255),country int(255),PRIMARY KEY (id))";

  https
    .get(
      "https://api.census.gov/data/2020/pdb/statecounty?get=Tot_GQ_CEN_2010&for=county:*&in=state:*&key=" +
        CENSUS_KEY,
      (resp) => {
        let data = "";

        resp.on("data", (chunk) => {
          data += chunk;
        });

        resp.on("end", () => {
          let censusData = JSON.parse(data);
          let insertQ =
            "INSERT INTO Tot_GQ_CEN_2010(population,state,country) values";
          let selectQ = "SELECT * from Tot_GQ_CEN_2010";
          for (let i = 1; i < censusData.length; i++) {
            insertQ =
              insertQ +
              "(" +
              censusData[i][0] +
              "," +
              censusData[i][1] +
              "," +
              censusData[i][2] +
              "),";
          }
          insertQ = insertQ.substring(0, insertQ.length - 1);
          dbConfig.query(selectQ, function (err, result) {
            if (err) {
              dbConfig.query(createStateTable, function (error, res_create) {
                if (error) {
                  res.status(404).send({ success: false });
                } else {
                  console.log("Tot_GQ_CEN_2010 TABLE CREATED");
                  dbConfig.query(insertQ, function (error_insert, response) {
                    if (error_insert) {
                      console.log(error_insert);
                      res.status(404).send({ success: false });
                    } else {
                      res.status(200).send({ success: true });
                    }
                  });
                }
              });
            } else {
              if (result != null) {
                res.status(200).send({ success: true });
              } else {
                dbConfig.query(insertQ, function (error_insert, response) {
                  if (error_insert) {
                    console.log(error_insert);
                    res.status(404).send({ success: false });
                  } else {
                    res.status(200).send({ success: true });
                  }
                });
              }
            }
          });
        });
      }
    )
    .on("error", (err) => {
      console.log("Error: " + err.message);
    });
};
