import fs from 'fs';
import { get } from 'http';
import path from 'path';
import firebase from "./firebase";

const dataDir = path.join(process.cwd(), 'data');

export function getAllIds() {
  const filePath = path.join(dataDir, 'persons.json');
  const jsonString = fs.readFileSync(filePath, 'utf8');
  const jsonObj1 = JSON.parse(jsonString);
  const filePath2 = path.join(dataDir, 'persons2.json');
  const jsonString2 = fs.readFileSync(filePath2, 'utf8');
  const jsonObj2 = JSON.parse(jsonString2);
  const jsonObj = jsonObj1.concat(jsonObj2);
  
  return jsonObj.map(item => {
    return {
      params: {
        id: item.id.toString()
      }
    }
  });
}

export async function getSortedList() {
  /*const filePath = path.join(dataDir, 'persons.json');
  const jsonString = fs.readFileSync(filePath, 'utf8');
  const jsonObj1 = JSON.parse(jsonString);
  const filePath2 = path.join(dataDir, 'persons2.json');
  const jsonString2 = fs.readFileSync(filePath2, 'utf8');
  const jsonObj2 = JSON.parse(jsonString2);
  const jsonObj = jsonObj1.concat(jsonObj2);*/
  const snapshot = await firebase.collection("persons").get();
  let output = [];
  snapshot.forEach(
    (doc) => {
      output.push(
        {
          id: doc.id,
          data: doc.data()
        }
      );
    }
  );
  const jsonObj = output;
  jsonObj.sort(function (a, b) {
      return a.data.name.localeCompare(b.data.name);
  });
  return jsonObj.map(item => {
    return {
      id: item.id,
      name: item.data.name
    }
  });
}

export async function getData(idRequested) {
  const filePath = path.join(dataDir, 'persons.json');
  const jsonString = fs.readFileSync(filePath, 'utf8');
  const jsonObj1 = JSON.parse(jsonString);
  const filePath2 = path.join(dataDir, 'persons2.json');
  const jsonString2 = fs.readFileSync(filePath2, 'utf8');
  const jsonObj2 = JSON.parse(jsonString2);
  const jsonObj = jsonObj1.concat(jsonObj2);
  const objMatch = jsonObj.filter(obj => {
    return obj.id.toString() === idRequested;
  });



  let objReturned;
  if (objMatch.length > 0) {
    objReturned = objMatch[0];
  } else {
    objReturned = {};
  }
  return objReturned;
}