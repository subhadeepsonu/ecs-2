"use client"
import { get, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { database } from "@/firebase-config";
function caesarDecrypt(encryptedText, shift) {
  let result = "";
  for (let i = 0; i < encryptedText.length; i++) {
      let char = encryptedText[i];
      if (char.match(/[a-z]/i)) {
          let code = encryptedText.charCodeAt(i);
          if (code >= 65 && code <= 90) {
              char = String.fromCharCode(((code - 65 - shift + 26) % 26) + 65);
          }
      else if (code >= 97 && code <= 122) {
              char = String.fromCharCode(((code - 97 - shift + 26) % 26) + 97);
          }
      }
      result += char;
  }
  return result;
}

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
            ...data 
          }));
          setUsers(userArray);
        } else {
          setUsers([]);
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
            ...data 
          }));
          setflame(flameArray);
        } else {
          setflame([]); 
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
            ...data 
          }));
          setgas(gasArray);
        } else {
          setgas([]); 
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
      <div className="flex justify-around items-start p-10">
        <div className="bg-divback min-h-40 w-1/3 rounded-lg text-white flex flex-col justify-center items-center m-5">
        <div className="text-xl font-bold">User entries</div>
          {users.map((user) => (
            <div className="p-10" key={user.id}>
            <div className="text-white " >
            {caesarDecrypt(user.msg, 3)}
            </div>
            <div className="text-white ">
            {caesarDecrypt(user.time, 3)}
            </div>
            </div>
          ))}
        </div>
        <div className="bg-divback min-h-40 w-1/3 rounded-lg text-white flex flex-col justify-center items-center m-5">
        <div className="text-xl font-bold">Flame data</div>
          {flame.map((flame) => (
            <div className="p-10" key={flame.id}>
            <div className="text-white " >
            {caesarDecrypt(flame.msg, 3)}
            </div>
              <div className="text-white " >
            {caesarDecrypt(flame.time, 3)}
            </div>
            </div>
          ))}
        </div>
        <div className="bg-divback min-h-40 w-1/3 rounded-lg text-white flex flex-col justify-center items-center m-5 ">
          <div className="text-xl font-bold">Gas data</div>
          {gas.map((gas) => (
            <div className="p-10" key={gas.id}>
            <div className="text-white " >
            {caesarDecrypt(gas.msg, 3)}
              
            </div>
            <div className="text-white " >
            {caesarDecrypt(gas.time, 3)}
              
            </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
