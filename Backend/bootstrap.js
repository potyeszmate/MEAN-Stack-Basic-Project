const mongoose = require('mongoose');
// #2 mivel már regisztráltuk, a sémánkat le tudjuk kérni a mongoose-on keresztül is a megfelelő kollekcióra történő hivatkozással
const User = mongoose.model('users');

async function ensureAdminExists() {
    try {
      const admin = await User.findOne({ accesLevel: 'admin' }); 
      if (admin) { 
        console.log('Az admin felhasználó már megtalálható az adatbázisban!');
      } else {
        
        const username = 'newAdmin';
        const existingUser = await User.findOne({ username });
        if (existingUser) {
          console.log('A megadott felhasználónév már létezik!');
        } else {
          const newAdmin = new User({
            username,
            email: 'admin@admin.com',
            password: 'admin123',
            accesLevel: 'admin',
          });
          await newAdmin.save();
          console.log('Az admin felhasználó sikeresen létrehozva!');
        }
      }
    } catch (error) {
      console.error('Hiba történt az admin ellenőrzése vagy létrehozása során: ', error);
    }
  }
  

module.exports = ensureAdminExists;