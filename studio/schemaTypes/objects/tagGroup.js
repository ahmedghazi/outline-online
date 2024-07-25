// import supportedLanguages from "../locale/supportedLanguages";

export default {
  title: 'Tag group',
  name: 'tagGroup',
  type: 'object',
  preview: {
    select: {
      group: `title`,
    },
    prepare(selection) {
      const {group} = selection
      // console.log(group);
      return {
        title: group.fr,
        // subtitle: "test",
      }
    },
  },
  fields: [
    {
      name: 'title',
      type: 'localeString',
    },
    {
      name: 'tags',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{type: 'tag'}],
        },
      ],
    },
  ],
}
