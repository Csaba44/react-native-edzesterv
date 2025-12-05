// Külön fájlban is létre lehet hozni a type-okat ha több helyen is használod a kódban
// Ilyenkor importálni kell természetesen
type Item = {
  id: string;
  name: string;
  isDone: boolean;
};


export { Item };

