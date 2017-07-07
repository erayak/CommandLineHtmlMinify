
    // Library
    const prompt = require('prompt');
    const fs = require('fs');
    const fse = require('fs.extra');
    const Minimize = require('minimize'), 
          minimize = new Minimize();

    // Prompt Start
    prompt.start();

    console.log("Do you start? ( yes,no )");

    prompt.get(['status'], (err, result) => {

            if( result.status === "yes" )
            {

                let fileName = [];
                
                fs.rmdir("output",( ex ) => {

                    fs.readdir('AddMinifyHtmlFile',( err, rows ) => {

                        fileName = rows;

                            let multiMinfyData = 0;
                            let multiMinfyDatas = () => {

                                    if( multiMinfyData != fileName.length )
                                    {
                                        
                                        fs.readFile(`AddMinifyHtmlFile/${fileName[multiMinfyData]}`,( err, rows ) => {

                                            minimize.parse(rows, (error, data) => {

                                                fs.mkdir(`output`,( ex ) => {
                                                        
                                                    fse.copy(`AddMinifyHtmlFile/${fileName[multiMinfyData]}`, `output/${fileName[multiMinfyData]}`, { replace: false },(err) => {

                                                        fs.writeFile(`output/${fileName[multiMinfyData]}`, `${data}`, (err) => {

                                                            multiMinfyData++;
                                                            return multiMinfyDatas();

                                                        });

                                                    });

                                                });

                                            });

                                        });
                                    
                                    }
                                    else
                                        console.log(" Successful! ( In the file output folder ) ");

                            };
                            multiMinfyDatas();

                    });

                });
            
            }
            else
                console.log("Bye");

    });