

module.exports = (app) => { 
    app.get('/api/notes', (req, res) => { 
        fs.readFile('./db/db.json', 'uft8', (err, data) => { 
            let noteContent = JSON.parse(data);
            res.json(noteContent); 
            if (err) throw(err);
        });
    });

    app.post('./api/notes', (req, res) => { 
        fs.readFile('./db/db.json', 'uft8', (err, data) => { 
            let noteContent = JSON.parse(data); 
            const addNote = { title: req.body.title, text: req.body.text, id: new Date().getTime()}
        

            const newNoteContent = noteContent.concat(addNote); 
            writeFile(newNoteContent); 
            res.json(newNoteContent); 
        })
    })

    app.delete("/api/notes/:id", (req, res) => { 
        fs.readFile("./db/db.json", "uft8", (err, data) => { 
            const id = req.params.id; 
            let noteContent = JSON.parse(data);

            const index = noteContent.findIndex((a) => a.id == id); 

            noteData.splice(index, 1);
            writeFile(noteContent); 
            
            return res.send(); 
        }); 
     });
}

function writeFile(change) { 
    fs.writeFile("./db/db.json", JSON.stringify(change), (err) => { 
        if (err) throw (err);
    })
}