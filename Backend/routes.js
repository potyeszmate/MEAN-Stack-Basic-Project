const express = require('express');
const router = express.Router();
const passport = require('passport');

const mongoose = require('mongoose');

const exampleModel = mongoose.model('example');
const userModel = mongoose.model('users');
const playerModel = mongoose.model('player');


//login
router.route('/login').post((req, res, next) => {
  if (req.body.username, req.body.password) {
    passport.authenticate('local', function(error, user) {
      if(error) return res.status(500).send(error);
      req.login(user, function(error) {
        if(error) return res.status(500).send(error);
        return res.status(200).send('Bejelentkezes sikeres');
      });
    })(req, res);
  } else {
    return res.status(400).send('Hibas keres, username es passw kell');
  }
});

//logout
router.route('/logout').post((req, res, next) => {
  if(req.isAuthenticated()) {
    req.logout();
    return res.status(200).send('Kijelentkezes sikeres');
  } else {
    return res.status(400).send('Nem volt bejelentkezve');
  }
});

//user status
router.route('/status').get((req, res, next) => {
    if(req.isAuthenticated()) {
      return res.status(200).send(req.session.passport);
    }else {
      return res.status(403).send('Nem volt bejelentkezve');
    }
});


//user
router.route('/user')
  .get((req, res, next) => {
    userModel.find({})
      .then((users) => {
        res.status(200).send(users);
      })
      .catch((err) => {
        res.status(500).send('DB error');
      });
  })  
  //register a user
  .post((req, res, next) => {    
    if (req.body.username && req.body.email && req.body.password) {
      userModel.findOne({ username: req.body.username })
        .then((user) => {
          if (user) {
            return res.status(400).send('Ez a felhasználónév már létezik');
          }
  
          const usr = new userModel({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
          });
  
          return usr.save().then(() => {
            res.status(202).send('Successful save ');
          });
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send('Error while saving user');
        });
    } else {
      res.status(400).send('There is no username, email or password');
    }
  });

  router.route('/useradd')
  .post((req, res, next) => {
    if(req.body.username && req.body.email  && req.body.password  && req.body.accesLevel){
      userModel.findOne({username: req.body.username})
            .then((user) => {
                if(user){
                    return res.status(400).send('Már van ilyen nev');
                }else{
                    const user = new userModel({
                      username: req.body.username,
                      email: req.body.email,
                      password: req.body.password,
                      accesLevel: req.body.accesLevel
                    })
                    user.save()
                        .then(() => {
                            res.status(202).send('sikeres mentes');
                        })
                        .catch((err) => {
                          console.error(err);
                          return res.status(500).send('Mentes soran hiba tortent');
                        })
                }
            })
            .catch((err) => {
                return res.status(500).send('DB hiba');
            })
    }else{
        return res.status(400).send('Nincs id, nincs value vagy value');
    }
  });

  // Update a user by username
router.route('/user/:username')
.put((req, res, next) => {
  if (req.body.accesLevel) {
    userModel.findOneAndUpdate({ username: req.params.username }, {
      accesLevel: req.body.accesLevel,
    })
      .then((user) => {
        if (!user) {
          return res.status(404).send('User not found');
        }
        res.status(200).send('User updated successfully');
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Error while updating user');
      });
  } else {
    res.status(400).send('Missing email or password');
  }
});


//update user
router.route('/user/:username')
.put((req, res, next) => {
  userModel.findOneAndUpdate({ username: req.params.username }, { $set: req.body }, { new: true })
  .then((user) => {
    if(user){
      res.status(200).json(user);
    }else{
      res.status(404).send('A megadott user nem található');
    }
  })
  .catch((err) => {
    return res.status(500).send('DB hiba');
  });
});

// Delete a user by username
router.route('/user/:username')
.delete((req, res, next) => {
  userModel.findOneAndDelete({ username: req.params.username })
    .then((user) => {
      if (!user) {
        return res.status(404).send('User not found');
      }
      res.status(200).send('User deleted successfully');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error while deleting user');
    });
});

// Get a single user by username
router.route('/user/:username')
  .get((req, res, next) => {
    userModel.findOne({ username: req.params.username })
      .then((user) => {
        if (!user) {
          return res.status(404).send('User not found');
        }
        return res.status(200).send(user);
      })
      .catch((err) => {
        return res.status(500).send('DB error');
      });
  });


//teams
router.route('/team')
  .get((req, res, next) => {
    exampleModel.find({})
      .then((teams) => {
        res.status(200).send(teams);
      })
      .catch((err) => {
        res.status(500).send('DB hiba');
      });
  }).post((req, res, next) => {
    if(req.body.teamname && req.body.country  && req.body.teamvalue  && req.body.stadium){
        exampleModel.findOne({teamname: req.body.teamname})
            .then((team) => {
                if(team){
                    return res.status(400).send('Már van ilyen nev');
                }else{
                    const team = new exampleModel({
                        teamname: req.body.teamname,
                        country: req.body.country,
                        teamvalue: req.body.teamvalue,
                        stadium: req.body.stadium
                    })
                    team.save()
                        .then(() => {
                            res.status(202).send('sikeres mentes');
                        })
                        .catch((err) => {
                          console.error(err);
                          return res.status(500).send('Mentes soran hiba tortent');
                        })
                }
            })
            .catch((err) => {
                return res.status(500).send('DB hiba');
            })
    }else{
        return res.status(400).send('Nincs id, nincs value vagy value');
    }
  });


router.route('/team/:teamname')
.put((req, res, next) => {
  exampleModel.findOneAndUpdate({ teamname: req.params.teamname }, { $set: req.body }, { new: true })
  .then((team) => {
    if(team){
      res.status(200).json(team);
    }else{
      res.status(404).send('A megadott team nem található');
    }
  })
  .catch((err) => {
    return res.status(500).send('DB hiba');
  });
});

// Delete a team by teamname
router.route('/team/:teamname')
.delete((req, res, next) => {
  exampleModel.findOneAndDelete({ teamname: req.params.teamname })
    .then((team) => {
      if (!team) {
        return res.status(404).send('Team not found');
      }
      res.status(200).send('Team deleted successfully');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error while deleting team');
    });
});

// Get a single team by teamname
router.route('/team/:teamname')
  .get((req, res, next) => {
    exampleModel.findOne({ teamname: req.params.teamname })
      .then((team) => {
        if (!team) {
          return res.status(404).send('team not found');
        }
        return res.status(200).send(team);
      })
      .catch((err) => {
        return res.status(500).send('DB error');
      });
  });


//players
// GET API to list players with a certain teamname
router.route('/player/:teamname')
.get((req, res, next) => {
  playerModel.find({teamname: req.params.teamname})
    .then((players) => {
      res.status(200).send(players);
    })
    .catch((err) => {
      res.status(500).send('DB hiba');
    });
});

// POST API to add a player
router.route('/players')
.post((req, res, next) => {
  if(req.body.playername && req.body.value && req.body.goals && req.body.country && req.body.teamname){
      playerModel.findOne({playername: req.body.playername, teamname: req.body.teamname})
          .then((player) => {
              if(player){
                  return res.status(400).send('Már van ilyen játékos ezzel a nevvel a csapatban');
              }else{
                  const player = new playerModel({
                    playername: req.body.playername,
                      value: req.body.value,
                      goals: req.body.goals,
                      country: req.body.country,
                      teamname: req.body.teamname
                  })
                  player.save()
                      .then(() => {
                          res.status(202).send('Sikeres mentés');
                      })
                      .catch((err) => {
                          return res.status(500).send('Mentés során hiba történt');
                      })
              }
          })
          .catch((err) => {
              return res.status(500).send('DB hiba');
          })
  }else{
      return res.status(400).send('Hiányzó adatok: név, érték, gólok, ország vagy csapatnév');
  }

});
//update player
router.route('/players/:playername')
.put((req, res, next) => {
  playerModel.findOneAndUpdate({ playername: req.params.playername }, { $set: req.body }, { new: true })
  .then((player) => {
    if(player){
      res.status(200).json(player);
    }else{
      res.status(404).send('A megadott játékos nem található');
    }
  })
  .catch((err) => {
    return res.status(500).send('DB hiba');
  });
});

router.route('/players')
.get((req, res, next) => {
  playerModel.find({})
    .then((players) => {
      res.status(200).send(players);
    })
    .catch((err) => {
      res.status(500).send('DB hiba');
    });
});

router.route('/players/:playername')
.delete((req, res, next) => {
  playerModel.findOneAndDelete({ playername: req.params.playername })
    .then((player) => {
      if (!player) {
        return res.status(404).send('player not found');
      }
      res.status(200).send('palyer deleted successfully');
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Error while deleting team');
    });
});


//get one player
  router.route('/playerdetails/:playername')
  .get((req, res, next) => {
    playerModel.findOne({ playername: req.params.playername })
      .then((player) => {
        if (!player) {
          return res.status(404).send('player not found');
        }
        return res.status(200).send(player);
      })
      .catch((err) => {
        return res.status(500).send('DB error');
      });
  });





module.exports = router;
