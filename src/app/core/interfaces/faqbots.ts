import { IMeta } from "./meta";

export interface IArticleItem {
    'answers'?: any[];
    'category_id'?: string;
    'created_at'?: number;
    'questions'?: any[];
    'section_id'?: string;
    'updated_at'?: number;
}
export interface ICategoryMappingItem {
    'category_id'?: string;
    'name'?: string;
    'section_ids'?: number[];
}
export interface ICorpus {

    'agent_handover'?: boolean;
    'algorithm'?: {
        'id'?: string;
        'name'?: string;
    };
    'bot_id'?: number;
    'category_mapping'?: ICategoryMappingItem[];
    'created_at'?: number;
    'created_by'?: number;
    'description'?: string;
    'first_draft'?: boolean;
    'id'?: number;
    'model_id'?: string;
    'model_version_id'?: number;
    'parent_corpus'?: number;
    'resource_uri'?: string;
    'sections'?: IArticleItem[];
    'state'?: string;
    'updated_at'?: number;
    'updated_by'?: number;

}
export interface ICurationResult{
    'meta': IMeta;
  'objects': ICurationItem[];
}

export interface ICurationItem{
    
        "bot_id"?:number,
        "bot_message_id"?:number,
        "consumer_id"?:number,
        "corpus_id"?:number,
        "created_at"?:number,
        "created_by"?:number,
        "curation_state"?:string,
        "first_question"?:string,
        "generated_msg"?: object[],
        "id"?: number,
        "platform"?:string,
        "resolved_section"?: {
            "corpus_id"?: number,
            "first_question"?: string,
            "new_section"?: boolean,
            "section_id"?: string
        },
        "resource_uri"?:string,
        "room_id"?: number,
        "section_id"?:string,
        "transaction_id"?:string,
        "triggered_rules"?: {
            "agent_handover"?: boolean,
            "downvoted"?:boolean,
            "fallback"?:boolean,
            "from_session"?:boolean,
            "low_confidence"?:boolean,
            "partial_match"?:boolean,
        },
        "updated_at"?: number,
        "updated_by"?: number,
        "user_message"?:string,
      
}