import type * as prismic from "@prismicio/client";

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };


type PickContentRelationshipFieldData<
	TRelationship extends prismic.CustomTypeModelFetchCustomTypeLevel1 | prismic.CustomTypeModelFetchCustomTypeLevel2 | prismic.CustomTypeModelFetchGroupLevel1 | prismic.CustomTypeModelFetchGroupLevel2,
	TData extends Record<string, prismic.AnyRegularField | prismic.GroupField | prismic.NestedGroupField | prismic.SliceZone>,
	TLang extends string
> = |
	// Content relationship fields
	{
		[TSubRelationship in Extract<
			TRelationship["fields"][number], prismic.CustomTypeModelFetchContentRelationshipLevel1
		> as TSubRelationship["id"]]:
			ContentRelationshipFieldWithData<TSubRelationship["customtypes"], TLang>;
	} &
	// Group
	{
		[TGroup in Extract<
			TRelationship["fields"][number], prismic.CustomTypeModelFetchGroupLevel1 | prismic.CustomTypeModelFetchGroupLevel2
		> as TGroup["id"]]:
			TData[TGroup["id"]] extends prismic.GroupField<infer TGroupData>
				? prismic.GroupField<PickContentRelationshipFieldData<TGroup, TGroupData, TLang>>
				: never
	} &
	// Other fields
	{
		[TFieldKey in Extract<TRelationship["fields"][number], string>]:
			TFieldKey extends keyof TData ? TData[TFieldKey] : never;
	};

type ContentRelationshipFieldWithData<
	TCustomType extends readonly (prismic.CustomTypeModelFetchCustomTypeLevel1 | string)[] | readonly (prismic.CustomTypeModelFetchCustomTypeLevel2 | string)[],
	TLang extends string = string
> = {
	[ID in Exclude<TCustomType[number], string>["id"]]:
		prismic.ContentRelationshipField<
			ID,
			TLang,
			PickContentRelationshipFieldData<
				Extract<TCustomType[number], { id: ID }>,
				Extract<prismic.Content.AllDocumentTypes, { type: ID }>["data"],
				TLang
			>
		>
}[Exclude<TCustomType[number], string>["id"]];

type ContactDocumentDataSlicesSlice = never

/**
 * Content for Contact documents
 */
interface ContactDocumentData {
	/**
	 * Slice Zone field in *Contact*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: contact.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	slices: prismic.SliceZone<ContactDocumentDataSlicesSlice>;/**
	 * Meta Title field in *Contact*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: contact.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
	
	/**
	 * Meta Description field in *Contact*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A brief summary of the page
	 * - **API ID Path**: contact.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
	
	/**
	 * Meta Image field in *Contact*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: contact.meta_image
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	meta_image: prismic.ImageField<never>;
}

/**
 * Contact document from Prismic
 *
 * - **API ID**: `contact`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type ContactDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<ContactDocumentData>, "contact", Lang>;

type HomeDocumentDataSlicesSlice = HomepageSlice

/**
 * Content for Home documents
 */
interface HomeDocumentData {
	/**
	 * Slice Zone field in *Home*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	slices: prismic.SliceZone<HomeDocumentDataSlicesSlice>;/**
	 * Meta Title field in *Home*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: home.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
	
	/**
	 * Meta Description field in *Home*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A brief summary of the page
	 * - **API ID Path**: home.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
	
	/**
	 * Meta Image field in *Home*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: home.meta_image
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	meta_image: prismic.ImageField<never>;
}

/**
 * Home document from Prismic
 *
 * - **API ID**: `home`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type HomeDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<HomeDocumentData>, "home", Lang>;

type InsightsDocumentDataSlicesSlice = FooterSlice

/**
 * Content for Insights documents
 */
interface InsightsDocumentData {
	/**
	 * Slice Zone field in *Insights*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: insights.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	slices: prismic.SliceZone<InsightsDocumentDataSlicesSlice>;/**
	 * Meta Title field in *Insights*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: insights.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
	
	/**
	 * Meta Description field in *Insights*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A brief summary of the page
	 * - **API ID Path**: insights.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
	
	/**
	 * Meta Image field in *Insights*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: insights.meta_image
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	meta_image: prismic.ImageField<never>;
}

/**
 * Insights document from Prismic
 *
 * - **API ID**: `insights`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type InsightsDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<InsightsDocumentData>, "insights", Lang>;

type ShowDocumentDataSlicesSlice = PerformerHeroSlice | SloganSlice | KeyImageSlice | GridSlice | FooterSlice

/**
 * Content for Show documents
 */
interface ShowDocumentData {
	/**
	 * Slice Zone field in *Show*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: show.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	slices: prismic.SliceZone<ShowDocumentDataSlicesSlice>;/**
	 * Meta Title field in *Show*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: show.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
	
	/**
	 * Meta Description field in *Show*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A brief summary of the page
	 * - **API ID Path**: show.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
	
	/**
	 * Meta Image field in *Show*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: show.meta_image
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	meta_image: prismic.ImageField<never>;
}

/**
 * Show document from Prismic
 *
 * - **API ID**: `show`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type ShowDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<ShowDocumentData>, "show", Lang>;

type SingoloPerformerDocumentDataSlicesSlice = PerformerHeroSlice | PerformerGridSlice | SloganSlice | FooterSlice

/**
 * Content for Singolo Performer documents
 */
interface SingoloPerformerDocumentData {
	/**
	 * Slice Zone field in *Singolo Performer*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: singolo_performer.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	slices: prismic.SliceZone<SingoloPerformerDocumentDataSlicesSlice>;/**
	 * Meta Title field in *Singolo Performer*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: singolo_performer.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
	
	/**
	 * Meta Description field in *Singolo Performer*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A brief summary of the page
	 * - **API ID Path**: singolo_performer.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
	
	/**
	 * Meta Image field in *Singolo Performer*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: singolo_performer.meta_image
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	meta_image: prismic.ImageField<never>;
}

/**
 * Singolo Performer document from Prismic
 *
 * - **API ID**: `singolo_performer`
 * - **Repeatable**: `true`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type SingoloPerformerDocument<Lang extends string = string> = prismic.PrismicDocumentWithUID<Simplify<SingoloPerformerDocumentData>, "singolo_performer", Lang>;

type TalentiDocumentDataSlicesSlice = never

/**
 * Content for Talenti documents
 */
interface TalentiDocumentData {
	/**
	 * Slice Zone field in *Talenti*
	 *
	 * - **Field Type**: Slice Zone
	 * - **Placeholder**: *None*
	 * - **API ID Path**: talenti.slices[]
	 * - **Tab**: Main
	 * - **Documentation**: https://prismic.io/docs/slices
	 */
	slices: prismic.SliceZone<TalentiDocumentDataSlicesSlice>;/**
	 * Meta Title field in *Talenti*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A title of the page used for social media and search engines
	 * - **API ID Path**: talenti.meta_title
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_title: prismic.KeyTextField;
	
	/**
	 * Meta Description field in *Talenti*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: A brief summary of the page
	 * - **API ID Path**: talenti.meta_description
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	meta_description: prismic.KeyTextField;
	
	/**
	 * Meta Image field in *Talenti*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: talenti.meta_image
	 * - **Tab**: SEO & Metadata
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	meta_image: prismic.ImageField<never>;
}

/**
 * Talenti document from Prismic
 *
 * - **API ID**: `talenti`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/content-modeling
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type TalentiDocument<Lang extends string = string> = prismic.PrismicDocumentWithoutUID<Simplify<TalentiDocumentData>, "talenti", Lang>;

export type AllDocumentTypes = ContactDocument | HomeDocument | InsightsDocument | ShowDocument | SingoloPerformerDocument | TalentiDocument;

/**
 * Primary content in *Footer → Default → Primary*
 */
export interface FooterSliceDefaultPrimary {
	/**
	 * Motto field in *Footer → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Crudo e mais.
	 * - **API ID Path**: footer.default.primary.motto
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	motto: prismic.KeyTextField;
	
	/**
	 * Related show field in *Footer → Default → Primary*
	 *
	 * - **Field Type**: Content Relationship
	 * - **Placeholder**: *None*
	 * - **API ID Path**: footer.default.primary.related_show
	 * - **Documentation**: https://prismic.io/docs/fields/content-relationship
	 */
	related_show: ContentRelationshipFieldWithData<[{"id":"show","fields":["meta_title","meta_description","meta_image"]}]>;
	
	/**
	 * Related Show Right field in *Footer → Default → Primary*
	 *
	 * - **Field Type**: Content Relationship
	 * - **Placeholder**: *None*
	 * - **API ID Path**: footer.default.primary.related_show_right
	 * - **Documentation**: https://prismic.io/docs/fields/content-relationship
	 */
	related_show_right: ContentRelationshipFieldWithData<[{"id":"show","fields":["meta_title","meta_description","meta_image"]}]>;
}

/**
 * Default variation for Footer Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type FooterSliceDefault = prismic.SharedSliceVariation<"default", Simplify<FooterSliceDefaultPrimary>, never>;

/**
 * Primary content in *Footer → Footer Performer → Primary*
 */
export interface FooterSliceFooterPerformerPrimary {
	/**
	 * Motto field in *Footer → Footer Performer → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Crudo e mais.
	 * - **API ID Path**: footer.footerPerformer.primary.motto
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	motto: prismic.KeyTextField;
	
	/**
	 * Related Performer field in *Footer → Footer Performer → Primary*
	 *
	 * - **Field Type**: Content Relationship
	 * - **Placeholder**: *None*
	 * - **API ID Path**: footer.footerPerformer.primary.related_performer
	 * - **Documentation**: https://prismic.io/docs/fields/content-relationship
	 */
	related_performer: ContentRelationshipFieldWithData<[{"id":"singolo_performer","fields":["meta_title","meta_description","meta_image"]}]>;
	
	/**
	 * Related Performer Right field in *Footer → Footer Performer → Primary*
	 *
	 * - **Field Type**: Content Relationship
	 * - **Placeholder**: *None*
	 * - **API ID Path**: footer.footerPerformer.primary.related_performer_right
	 * - **Documentation**: https://prismic.io/docs/fields/content-relationship
	 */
	related_performer_right: ContentRelationshipFieldWithData<[{"id":"singolo_performer","fields":["meta_title","meta_description","meta_image"]}]>;
}

/**
 * Footer Performer variation for Footer Slice
 *
 * - **API ID**: `footerPerformer`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type FooterSliceFooterPerformer = prismic.SharedSliceVariation<"footerPerformer", Simplify<FooterSliceFooterPerformerPrimary>, never>;

/**
 * Primary content in *Footer → Footer Generic → Primary*
 */
export interface FooterSliceFooterGenericPrimary {
	/**
	 * Motto field in *Footer → Footer Generic → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Crudo e mais.
	 * - **API ID Path**: footer.footerGeneric.primary.motto
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	motto: prismic.KeyTextField;
	
	/**
	 * Related Performer field in *Footer → Footer Generic → Primary*
	 *
	 * - **Field Type**: Content Relationship
	 * - **Placeholder**: *None*
	 * - **API ID Path**: footer.footerGeneric.primary.related_performer
	 * - **Documentation**: https://prismic.io/docs/fields/content-relationship
	 */
	related_performer: ContentRelationshipFieldWithData<[{"id":"singolo_performer","fields":["meta_title","meta_description","meta_image"]}]>;
	
	/**
	 * Related Performer Right field in *Footer → Footer Generic → Primary*
	 *
	 * - **Field Type**: Content Relationship
	 * - **Placeholder**: *None*
	 * - **API ID Path**: footer.footerGeneric.primary.related_performer_right
	 * - **Documentation**: https://prismic.io/docs/fields/content-relationship
	 */
	related_performer_right: ContentRelationshipFieldWithData<[{"id":"singolo_performer","fields":["meta_title","meta_description","meta_image"]}]>;
}

/**
 * Footer Generic variation for Footer Slice
 *
 * - **API ID**: `footerGeneric`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type FooterSliceFooterGeneric = prismic.SharedSliceVariation<"footerGeneric", Simplify<FooterSliceFooterGenericPrimary>, never>;

/**
 * Slice variation for *Footer*
 */
type FooterSliceVariation = FooterSliceDefault | FooterSliceFooterPerformer | FooterSliceFooterGeneric

/**
 * Footer Shared Slice
 *
 * - **API ID**: `footer`
 * - **Description**: Footer
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type FooterSlice = prismic.SharedSlice<"footer", FooterSliceVariation>;

/**
 * Item in *Grid → Default → Primary → Grid Element*
 */
export interface GridSliceDefaultPrimaryGridElementItem {
	/**
	 * Grid Image field in *Grid → Default → Primary → Grid Element*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: grid.default.primary.grid_element[].grid_img
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	grid_img: prismic.ImageField<never>;
}

/**
 * Primary content in *Grid → Default → Primary*
 */
export interface GridSliceDefaultPrimary {
	/**
	 * Grid Element field in *Grid → Default → Primary*
	 *
	 * - **Field Type**: Group
	 * - **Placeholder**: *None*
	 * - **API ID Path**: grid.default.primary.grid_element[]
	 * - **Documentation**: https://prismic.io/docs/fields/repeatable-group
	 */
	grid_element: prismic.GroupField<Simplify<GridSliceDefaultPrimaryGridElementItem>>;
}

/**
 * Default variation for Grid Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type GridSliceDefault = prismic.SharedSliceVariation<"default", Simplify<GridSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Grid*
 */
type GridSliceVariation = GridSliceDefault

/**
 * Grid Shared Slice
 *
 * - **API ID**: `grid`
 * - **Description**: Grid
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type GridSlice = prismic.SharedSlice<"grid", GridSliceVariation>;

/**
 * Primary content in *Homepage → Default → Primary*
 */
export interface HomepageSliceDefaultPrimary {
	/**
	 * Hero Title field in *Homepage → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Amore, GAAAAYYYY!
	 * - **API ID Path**: homepage.default.primary.hero_title
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	hero_title: prismic.KeyTextField;
	
	/**
	 * Hero Description field in *Homepage → Default → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Crudo e mais // Scambiatevi un segno di miao // No perché, sono stata sul palco di Elodie // ...
	 * - **API ID Path**: homepage.default.primary.hero_description
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	hero_description: prismic.RichTextField;
}

/**
 * Default variation for Homepage Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type HomepageSliceDefault = prismic.SharedSliceVariation<"default", Simplify<HomepageSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Homepage*
 */
type HomepageSliceVariation = HomepageSliceDefault

/**
 * Homepage Shared Slice
 *
 * - **API ID**: `homepage`
 * - **Description**: Homepage
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type HomepageSlice = prismic.SharedSlice<"homepage", HomepageSliceVariation>;

/**
 * Primary content in *KeyImage → Default → Primary*
 */
export interface KeyImageSliceDefaultPrimary {
	/**
	 * Key Image field in *KeyImage → Default → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: key_image.default.primary.key_img
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	key_img: prismic.ImageField<never>;
}

/**
 * Default variation for KeyImage Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type KeyImageSliceDefault = prismic.SharedSliceVariation<"default", Simplify<KeyImageSliceDefaultPrimary>, never>;

/**
 * Slice variation for *KeyImage*
 */
type KeyImageSliceVariation = KeyImageSliceDefault

/**
 * KeyImage Shared Slice
 *
 * - **API ID**: `key_image`
 * - **Description**: KeyImage
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type KeyImageSlice = prismic.SharedSlice<"key_image", KeyImageSliceVariation>;

/**
 * Primary content in *PerformerGrid → Default → Primary*
 */
export interface PerformerGridSliceDefaultPrimary {
	/**
	 * Immagine 1 field in *PerformerGrid → Default → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: performer_grid.default.primary.img_1
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	img_1: prismic.ImageField<never>;
	
	/**
	 * Immagine 2 field in *PerformerGrid → Default → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: performer_grid.default.primary.img_2
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	img_2: prismic.ImageField<never>;
	
	/**
	 * Immagine 3 field in *PerformerGrid → Default → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: performer_grid.default.primary.img_3
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	img_3: prismic.ImageField<never>;
	
	/**
	 * Immagine 4 field in *PerformerGrid → Default → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: performer_grid.default.primary.img_4
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	img_4: prismic.ImageField<never>;
	
	/**
	 * Immagine 5 field in *PerformerGrid → Default → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: performer_grid.default.primary.img_5
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	img_5: prismic.ImageField<never>;
	
	/**
	 * Immagine 6 field in *PerformerGrid → Default → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: performer_grid.default.primary.img_6
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	img_6: prismic.ImageField<never>;
	
	/**
	 * Immagine 7 field in *PerformerGrid → Default → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: performer_grid.default.primary.img_7
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	img_7: prismic.ImageField<never>;
	
	/**
	 * Immagine 8 field in *PerformerGrid → Default → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: performer_grid.default.primary.img_8
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	img_8: prismic.ImageField<never>;
	
	/**
	 * Immagine 9 field in *PerformerGrid → Default → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: performer_grid.default.primary.img_9
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	img_9: prismic.ImageField<never>;
}

/**
 * Default variation for PerformerGrid Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type PerformerGridSliceDefault = prismic.SharedSliceVariation<"default", Simplify<PerformerGridSliceDefaultPrimary>, never>;

/**
 * Primary content in *PerformerGrid → Variant → Primary*
 */
export interface PerformerGridSliceVariantPrimary {
	/**
	 * Immagine 1 field in *PerformerGrid → Variant → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: performer_grid.variant.primary.img_1
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	img_1: prismic.ImageField<never>;
	
	/**
	 * Immagine 2 field in *PerformerGrid → Variant → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: performer_grid.variant.primary.img_2
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	img_2: prismic.ImageField<never>;
	
	/**
	 * Immagine 3 field in *PerformerGrid → Variant → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: performer_grid.variant.primary.img_3
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	img_3: prismic.ImageField<never>;
	
	/**
	 * Immagine 4 field in *PerformerGrid → Variant → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: performer_grid.variant.primary.img_4
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	img_4: prismic.ImageField<never>;
	
	/**
	 * Immagine 5 field in *PerformerGrid → Variant → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: performer_grid.variant.primary.img_5
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	img_5: prismic.ImageField<never>;
	
	/**
	 * Immagine 6 field in *PerformerGrid → Variant → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: performer_grid.variant.primary.img_6
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	img_6: prismic.ImageField<never>;
	
	/**
	 * Immagine 7 field in *PerformerGrid → Variant → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: performer_grid.variant.primary.img_7
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	img_7: prismic.ImageField<never>;
	
	/**
	 * Immagine 8 field in *PerformerGrid → Variant → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: performer_grid.variant.primary.img_8
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	img_8: prismic.ImageField<never>;
	
	/**
	 * Immagine 9 field in *PerformerGrid → Variant → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: performer_grid.variant.primary.img_9
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	img_9: prismic.ImageField<never>;
}

/**
 * Variant variation for PerformerGrid Slice
 *
 * - **API ID**: `variant`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type PerformerGridSliceVariant = prismic.SharedSliceVariation<"variant", Simplify<PerformerGridSliceVariantPrimary>, never>;

/**
 * Slice variation for *PerformerGrid*
 */
type PerformerGridSliceVariation = PerformerGridSliceDefault | PerformerGridSliceVariant

/**
 * PerformerGrid Shared Slice
 *
 * - **API ID**: `performer_grid`
 * - **Description**: PerformerGrid
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type PerformerGridSlice = prismic.SharedSlice<"performer_grid", PerformerGridSliceVariation>;

/**
 * Primary content in *Hero → Performer → Primary*
 */
export interface PerformerHeroSliceDefaultPrimary {
	/**
	 * Hero Background field in *Hero → Performer → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: performer_hero.default.primary.hero_background
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	hero_background: prismic.ImageField<never>;
	
	/**
	 * Nome Performer field in *Hero → Performer → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Jon Doe
	 * - **API ID Path**: performer_hero.default.primary.nome_performer
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	nome_performer: prismic.KeyTextField;
	
	/**
	 * Bio field in *Hero → Performer → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Lorem Ipsum dolor sit amet consectetur adepscing elitr...
	 * - **API ID Path**: performer_hero.default.primary.bio
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	bio: prismic.RichTextField;
	
	/**
	 * Instagram field in *Hero → Performer → Primary*
	 *
	 * - **Field Type**: Link
	 * - **Placeholder**: Non inserire "@" all'inizio, viene inserita di default.
	 * - **API ID Path**: performer_hero.default.primary.instagram
	 * - **Documentation**: https://prismic.io/docs/fields/link
	 */
	instagram: prismic.LinkField<string, string, unknown, prismic.FieldState, never>;
}

/**
 * Performer variation for Hero Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type PerformerHeroSliceDefault = prismic.SharedSliceVariation<"default", Simplify<PerformerHeroSliceDefaultPrimary>, never>;

/**
 * Primary content in *Hero → Show → Primary*
 */
export interface PerformerHeroSliceShowPrimary {
	/**
	 * Hero Background field in *Hero → Show → Primary*
	 *
	 * - **Field Type**: Image
	 * - **Placeholder**: *None*
	 * - **API ID Path**: performer_hero.show.primary.hero_background
	 * - **Documentation**: https://prismic.io/docs/fields/image
	 */
	hero_background: prismic.ImageField<never>;
	
	/**
	 * Nome Performer field in *Hero → Show → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Jon Doe
	 * - **API ID Path**: performer_hero.show.primary.nome_performer
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	nome_performer: prismic.KeyTextField;
	
	/**
	 * Bio field in *Hero → Show → Primary*
	 *
	 * - **Field Type**: Rich Text
	 * - **Placeholder**: Lorem Ipsum dolor sit amet consectetur adepscing elitr...
	 * - **API ID Path**: performer_hero.show.primary.bio
	 * - **Documentation**: https://prismic.io/docs/fields/rich-text
	 */
	bio: prismic.RichTextField;
}

/**
 * Show variation for Hero Slice
 *
 * - **API ID**: `show`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type PerformerHeroSliceShow = prismic.SharedSliceVariation<"show", Simplify<PerformerHeroSliceShowPrimary>, never>;

/**
 * Slice variation for *Hero*
 */
type PerformerHeroSliceVariation = PerformerHeroSliceDefault | PerformerHeroSliceShow

/**
 * Hero Shared Slice
 *
 * - **API ID**: `performer_hero`
 * - **Description**: PerformerHero
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type PerformerHeroSlice = prismic.SharedSlice<"performer_hero", PerformerHeroSliceVariation>;

/**
 * Primary content in *Slogan → Default → Primary*
 */
export interface SloganSliceDefaultPrimary {
	/**
	 * Slogan field in *Slogan → Default → Primary*
	 *
	 * - **Field Type**: Text
	 * - **Placeholder**: Lorem ipsum dolor sit amet
	 * - **API ID Path**: slogan.default.primary.slogan
	 * - **Documentation**: https://prismic.io/docs/fields/text
	 */
	slogan: prismic.KeyTextField;
}

/**
 * Default variation for Slogan Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type SloganSliceDefault = prismic.SharedSliceVariation<"default", Simplify<SloganSliceDefaultPrimary>, never>;

/**
 * Slice variation for *Slogan*
 */
type SloganSliceVariation = SloganSliceDefault

/**
 * Slogan Shared Slice
 *
 * - **API ID**: `slogan`
 * - **Description**: Slogan
 * - **Documentation**: https://prismic.io/docs/slices
 */
export type SloganSlice = prismic.SharedSlice<"slogan", SloganSliceVariation>;

declare module "@prismicio/client" {
	interface CreateClient {
		(repositoryNameOrEndpoint: string, options?: prismic.ClientConfig): prismic.Client<AllDocumentTypes>;
	}
	
	interface CreateWriteClient {
		(repositoryNameOrEndpoint: string, options: prismic.WriteClientConfig): prismic.WriteClient<AllDocumentTypes>;
	}
	
	interface CreateMigration {
		(): prismic.Migration<AllDocumentTypes>;
	}
	
	namespace Content {
		export type {
			ContactDocument,
			ContactDocumentData,
			ContactDocumentDataSlicesSlice,
			HomeDocument,
			HomeDocumentData,
			HomeDocumentDataSlicesSlice,
			InsightsDocument,
			InsightsDocumentData,
			InsightsDocumentDataSlicesSlice,
			ShowDocument,
			ShowDocumentData,
			ShowDocumentDataSlicesSlice,
			SingoloPerformerDocument,
			SingoloPerformerDocumentData,
			SingoloPerformerDocumentDataSlicesSlice,
			TalentiDocument,
			TalentiDocumentData,
			TalentiDocumentDataSlicesSlice,
			AllDocumentTypes,
			FooterSlice,
			FooterSliceDefaultPrimary,
			FooterSliceFooterPerformerPrimary,
			FooterSliceFooterGenericPrimary,
			FooterSliceVariation,
			FooterSliceDefault,
			FooterSliceFooterPerformer,
			FooterSliceFooterGeneric,
			GridSlice,
			GridSliceDefaultPrimaryGridElementItem,
			GridSliceDefaultPrimary,
			GridSliceVariation,
			GridSliceDefault,
			HomepageSlice,
			HomepageSliceDefaultPrimary,
			HomepageSliceVariation,
			HomepageSliceDefault,
			KeyImageSlice,
			KeyImageSliceDefaultPrimary,
			KeyImageSliceVariation,
			KeyImageSliceDefault,
			PerformerGridSlice,
			PerformerGridSliceDefaultPrimary,
			PerformerGridSliceVariantPrimary,
			PerformerGridSliceVariation,
			PerformerGridSliceDefault,
			PerformerGridSliceVariant,
			PerformerHeroSlice,
			PerformerHeroSliceDefaultPrimary,
			PerformerHeroSliceShowPrimary,
			PerformerHeroSliceVariation,
			PerformerHeroSliceDefault,
			PerformerHeroSliceShow,
			SloganSlice,
			SloganSliceDefaultPrimary,
			SloganSliceVariation,
			SloganSliceDefault
		}
	}
}