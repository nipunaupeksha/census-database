const dbConfig = require("../../mysql-connection");
const https = require('https');

const CENSUS_KEY="bfea2392b87db962a6204d335feef04c7c7899f4";

exports.getAllStates = function (req,res) {
    let createStateTable = "CREATE TABLE IF NOT EXISTS state(name VARCHAR(20),pop VARCHAR(20),state int(255),PRIMARY KEY (state))";

    https.get('https://api.census.gov/data/2019/pep/charagegroups?get=NAME,POP&for=state:*&key='+CENSUS_KEY, (resp) => {
    let data = '';

    // A chunk of data has been received.
    resp.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on('end', () => {
        let censusData = JSON.parse(data);
        let insertQ = "INSERT INTO state(name,pop,state) values";
        let selectQ = "SELECT * from state";
       for(let i=1;i<censusData.length;i++){
           insertQ = insertQ+"('" + censusData[i][0]+"','"+censusData[i][1]+"',"+censusData[i][2]+"),"
       }
       insertQ =insertQ.substring(0,insertQ.length-1);
       dbConfig.query(selectQ, function(err, result){
            if(err){
                dbConfig.query(createStateTable,function(error,res_create){
                    if(error){
                        res.status(404).send({ success: false });
                    }
                    else{
                        console.log("STATE TABLE CREATED");
                        dbConfig.query(insertQ,function(error_insert,response){
                            if(error_insert){
                                console.log(error_insert);
                                res.status(404).send({ success: false });
                            }
                            else{
                                res.status(200).send({ success: true });
                            }
                        });
                    }
                });
            }else{
                if(result!=null){
                    res.status(200).send({ success: true });
                }else{
                    dbConfig.query(insertQ,function(error_insert,response){
                        if(error_insert){
                            console.log(error_insert);
                            res.status(404).send({ success: false });
                        }
                        else{
                            res.status(200).send({ success: true });
                        }
                    }); 
                }
            }
        });
    });

    }).on("error", (err) => {
    console.log("Error: " + err.message);
    });
};