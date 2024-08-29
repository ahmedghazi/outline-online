export const seo = `
	...,
	metaImage{
		asset->
	}
`;

export const blockContent = `
	...,

	markDefs[] {
		...,
		_type == "linkInternal" => {
			...,
			reference->,
		}
	}
`;

export const figure = `
	...,
	image{
		asset->
	},
	caption,
	link->{
		_type,
		slug
	}
`;

export const productCard = `
	_id,
  _type,
  slug,
  title,
	price,
	singles[]{
		...,
		typeface->{
			slug,
			_id,
			// _key,
			title,
			typefaceFile{
				base64
			}
		}
	}
`;

export const moduleText = `
	_type == 'moduleText' => {
		...,
		text[]{
			${blockContent}
		}
	}
`;

export const moduleImage = `
	_type == 'moduleImage' => {
		${figure}
	}
`;

export const moduleImages = `
	_type == 'moduleImages' => {
		images[] {
			...,
			${figure}
		}
	}
`;

export const content = `
	...,
	items[]{
		...,
		image{
			asset->
		},

	}
`;
