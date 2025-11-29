// enregistre dans le state form la donnée reçue
// Gère le cas des checkbox
// Pour rappel le comportement normal d'une checkbox est d'envoyé ou pas une valeur
// si la case est cochée. Nous préférrons un comportement où la checkbox envoie true/false
const handleChange = (event, formData, setformData) => {
  const key = event.target.name;
  const value =
    event.target.type === "checkbox"
      ? event.target.checked
      : event.target.value;
  setformData({ ...formData, [key]: value });
};
export default handleChange;
