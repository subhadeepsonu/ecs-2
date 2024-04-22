"use client"
import { get, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "@/firebase-config";


// function decryptMessage(encryptedMessageBase64, key) {
//     // Base64 decoded encrypted message
//     const encryptedMessage = Buffer.from(encryptedMessageBase64, 'base64').toString('binary');

//     // Convert the key to binary
//     const keyBinary = Buffer.from(key, 'binary');

//     // Extract IV from the beginning of the message
//     const iv = encryptedMessage.slice(0, 16);

//     // Extract ciphertext after the IV
//     const ciphertext = encryptedMessage.slice(16);

//     // Convert key and IV to Forge buffers
//     const forgeKey = forge.util.createBuffer(keyBinary, 'binary');
//     const forgeIv = forge.util.createBuffer(iv, 'binary');

//     // Create decipher object with AES-CBC algorithm
//     const decipher = forge.cipher.createDecipher('AES-CBC', forgeKey);

//     // Set IV
//     decipher.start({ iv: forgeIv });

//     // Update decipher with ciphertext
//     decipher.update(forge.util.createBuffer(ciphertext, 'binary'));

//     // Finalize decryption
//     decipher.finish();

//     // Get the decrypted message
//     const decryptedMessage = decipher.output.toString();

//     return decryptedMessage;
// }

// Example usage
// const encryptedMessageBase64 = "YOUR_ENCRYPTED_MESSAGE_HERE";
// const key = "saptasagaralu";
// const decryptedMessage = decryptMessage(encryptedMessageBase64, key);
// console.log("Decrypted Message:", decryptedMessage);

export default function Home() {
  const [users, setUsers] = useState([]);
  const [flame, setflame] = useState([]);
  const [gas, setgas] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const usersRef = ref(database, "entries");
    get(usersRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const userArray = Object.entries(snapshot.val()).map(([id, data]) => ({
            id,
            ...data // Spread the data object to include all properties
          }));
          setUsers(userArray);
        } else {
          setUsers([]); // No data found, reset users state
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
      });
  }, []);
  useEffect(() => {
    const usersRef = ref(database, "flame sensor");
    get(usersRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const flameArray = Object.entries(snapshot.val()).map(([id, data]) => ({
            id,
            ...data // Spread the data object to include all properties
          }));
          setflame(flameArray);
        } else {
          setflame([]); // No data found, reset users state
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
      });
  }, []);
  useEffect(() => {
    const usersRef = ref(database, "smoke sensor");
    get(usersRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const gasArray = Object.entries(snapshot.val()).map(([id, data]) => ({
            id,
            ...data // Spread the data object to include all properties
          }));
          setgas(gasArray);
        } else {
          setgas([]); // No data found, reset users state
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError(error);
      });
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="bg-back min-h-screen">
      <div className="h-20 bg-gray-800 font-bold flex justify-center items-center text-white text-3xl">
        ECS-2
      </div>
      \
      <div className="flex justify-around items-start p-10">
        <div className="bg-divback min-h-40 w-1/3 rounded-lg text-white flex flex-col justify-center items-center m-5">
        <div className="text-xl font-bold">User entries</div>
          {users.map((user) => (
            <div className="p-10" key={user.id}>
            <div className="text-white " >
              {user.msg}
            </div>
            <div className="text-white ">
              {user.time}
            </div>
            </div>
          ))}
        </div>
        <div className="bg-divback min-h-40 w-1/3 rounded-lg text-white flex flex-col justify-center items-center m-5">
        <div className="text-xl font-bold">Flame data</div>
          {flame.map((flame) => (
            <div className="p-10" key={flame.id}>
            <div className="text-white " >
              {flame.msg}

              
               
            </div>
              <div className="text-white " >
              {flame.time}

              
               
            </div>
            </div>

          ))}
        </div>
        <div className="bg-divback min-h-40 w-1/3 rounded-lg text-white flex flex-col justify-center items-center m-5 ">
          <div className="text-xl font-bold">Gas data</div>
          {gas.map((gas) => (
            <div className="p-10" key={gas.id}>
            <div className="text-white " >
              {gas.msg}
              
            </div>
            <div className="text-white " >
              {gas.time}
              
            </div>
            </div>
          ))}
        </div>
        
      
      </div>
    </div>
  );
}
