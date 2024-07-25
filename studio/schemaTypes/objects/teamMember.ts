export default {
  title: 'Membre',
  name: 'teamMember',
  type: 'object',
  fields: [
    {type: 'image', name: 'image', options: {hotspot: true}},
    {type: 'string', name: 'name', title: 'Nom'},
    {type: 'string', name: 'job', title: 'Métier'},
    {type: 'string', name: 'speciality', title: 'Spécialité'},
    {type: 'url', name: 'link', title: 'link'},
  ],
}
