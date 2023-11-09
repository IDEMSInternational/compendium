alter table "public"."entity_field_value" drop constraint "entity_field_value_pkey";

alter table "public"."entity_link" drop constraint "entity_link_pkey";

alter table "public"."entity_tag" drop constraint "entity_tag_pkey";

drop index if exists "public"."entity_field_value_pkey";

drop index if exists "public"."entity_link_pkey";

drop index if exists "public"."entity_tag_pkey";

alter table "public"."entity_type" add column "display_field_type_id" bigint;

CREATE UNIQUE INDEX entity_field_value_pkey ON public.entity_field_value USING btree (entity_id, entity_field_type_id);

CREATE UNIQUE INDEX entity_link_pkey ON public.entity_link USING btree (link_entity_type_id, entity_type_id);

CREATE UNIQUE INDEX entity_tag_pkey ON public.entity_tag USING btree (linked_entity_id, entity_id);

alter table "public"."entity_field_value" add constraint "entity_field_value_pkey" PRIMARY KEY using index "entity_field_value_pkey";

alter table "public"."entity_link" add constraint "entity_link_pkey" PRIMARY KEY using index "entity_link_pkey";

alter table "public"."entity_tag" add constraint "entity_tag_pkey" PRIMARY KEY using index "entity_tag_pkey";

alter table "public"."entity_type" add constraint "entity_type_display_field_type_id_fkey" FOREIGN KEY (display_field_type_id) REFERENCES entity_field_type(id) ON DELETE SET NULL not valid;

alter table "public"."entity_type" validate constraint "entity_type_display_field_type_id_fkey";

create policy "Enable insert for authenticated users only"
on "public"."entity_field_value"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."entity_field_value"
as permissive
for select
to public
using (true);


create policy "Enable update for authenticated users only"
on "public"."entity_field_value"
as permissive
for update
to authenticated
with check (true);



