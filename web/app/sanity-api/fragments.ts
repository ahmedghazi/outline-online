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
	metadata,
	visible,
	singles[]{
		_key,
		_type,
		title,
		isDefault,
		typeface->{
			_type,
			slug,
			_id,
			title,
			typefaceFile{
				asset
			}
		}
	}
`;
export const productCardLight = `
	_id,
  _type,
  slug,
  title,
	price,
	metadata,
	visible,
	singles[]{
		_key,
		_type,
		title,
		isDefault,
		typeface->{
			_type,
			slug,
			_id,
			title,

		}
	}
`;

export const textUI = `
	_type == 'textUI' => {
		...,
		text[]{
			${blockContent}
		}
	}
`;

export const imageUI = `
	_type == 'imageUI' => {
		...,
		image{
		${figure}
		}
	}
`;

export const sliderUI = `
	_type == 'sliderUI' => {
		items[] {
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
