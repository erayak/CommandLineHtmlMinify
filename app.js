
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

                        fileName.push(rows);

                        fs.readFile(`AddMinifyHtmlFile/${rows[1]}`,( err, rows ) => {

                            minimize.parse(rows, (error, data) => {

                                fs.mkdir(`output`,( ex ) => {
                                        
                                    fse.copy(`AddMinifyHtmlFile/${fileName[0][1]}`, `output/${fileName[0][1]}`, { replace: false },(err) => {

                                        fs.writeFile(`output/${fileName[0][1]}`, `${data}`, (err) => {

                                            console.log(" Successful! ( In the file output folder ) ");
                                        
                                        });

                                    });

                                });

                            });

                        });

                    });

                });
            
            }
            else
                console.log("Bye");

    });