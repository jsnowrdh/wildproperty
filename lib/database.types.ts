export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      listings: {
        Row: {
          id: string;
          slug: string;
          title: string;
          type: string;
          city: string;
          state: string;
          price: number;
          acreage: number;
          description: string;
          sites: number | null;
          gross_revenue: string | null;
          noi: string | null;
          occupancy: string | null;
          image_url: string;
          status: string;
          broker_name: string | null;
          broker_email: string | null;
          broker_phone: string | null;
          broker_company: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          type: string;
          city: string;
          state: string;
          price: number;
          acreage: number;
          description: string;
          sites?: number | null;
          gross_revenue?: string | null;
          noi?: string | null;
          occupancy?: string | null;
          image_url: string;
          status?: string;
          broker_name?: string | null;
          broker_email?: string | null;
          broker_phone?: string | null;
          broker_company?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          type?: string;
          city?: string;
          state?: string;
          price?: number;
          acreage?: number;
          description?: string;
          sites?: number | null;
          gross_revenue?: string | null;
          noi?: string | null;
          occupancy?: string | null;
          image_url?: string;
          status?: string;
          broker_name?: string | null;
          broker_email?: string | null;
          broker_phone?: string | null;
          broker_company?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}

export type DbListing = Database["public"]["Tables"]["listings"]["Row"];
export type DbListingInsert = Database["public"]["Tables"]["listings"]["Insert"];
