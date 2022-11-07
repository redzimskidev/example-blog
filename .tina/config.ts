
import { defineStaticConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineStaticConfig({
  branch,
  clientId: null,   // Get this from tina.io
  token: null,      // Get this from tina.io
  build: {
    outputFolder: "admin",
    publicFolder: "static",
  },
  media: {
    tina: {
      mediaRoot: "uploads",
      publicFolder: "static",
    },
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "content/posts",
        defaultItem: () => {
          return {
              author: "{{your name here}}",
              date: new Date().toLocaleDateString("en"),
              draft: false
          }
        },
        ui: {
          filename: {
            readonly: true,
          },
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "author",
            label: "Author",
          },
          {
            type: "datetime",
            name: "date",
            label: "Date",
          },
          {
            type: "boolean",
            name: "draft",
            label: "Draft",
          },
          {
            type: 'string',
            name: 'tags',
            label: 'Tags',
            list: true,
          },
          {
            type: 'object',
            name: 'cover',
            label: 'Cover image',
            fields: [
                {
                    type: 'image',
                    name: 'image',
                    label: 'Image',
                },
                {
                    type: 'string',
                    name: 'alt',
                    label: 'Alternative text',
                },
                {
                    type: 'string',
                    name: 'caption',
                    label: 'Caption',
                },
            ]
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
});
