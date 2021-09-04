const fs = require('fs');
const uniqid = require('uniqid');

function writeFile(change) { 
    fs.writeFile("./db/db.json", JSON.stringify(change), (err) => { 
        if (err) throw (err);
    })
}
module.exports = (app) => { 
    app.get('/api/notes', (req, res) => { 
        fs.readFile('./db/db.json', (err, data) => { 
            let noteContent = JSON.parse(data);
            res.json(noteContent); 
            if (err) throw(err);
        });
    });

    app.post('./api/notes', (req, res) => { 
        fs.readFile('./db/db.json',"uft8", (err, data) => { 
            let noteContent = JSON.parse(data); 
            const addNote = { id: uniqid(), title: req.body.title, text: req.body.text }
        

            const newNoteContent = noteContent.concat(addNote); 
            writeFile(newNoteContent); 
            res.json(newNoteContent); 


        })
    })

    app.delete("/api/notes/:id", (req, res) => { 
        fs.readFile("./db/db.json", (err, data) => { 
            const id = req.params.id; 
            let noteContent = JSON.parse(data);

            const index = noteContent.findIndex((a) => a.id == id); 

            noteContent.splice(index, 1);
            writeFile(noteContent); 
            
            return res.send(); 
        }); 
     });
}
