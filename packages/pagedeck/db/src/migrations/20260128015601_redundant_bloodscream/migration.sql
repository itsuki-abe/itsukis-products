CREATE TABLE "account" (
	"id" string PRIMARY KEY,
	"account_id" string NOT NULL,
	"provider_id" string NOT NULL,
	"user_id" string NOT NULL,
	"access_token" string,
	"refresh_token" string,
	"id_token" string,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" string,
	"password" string,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" string PRIMARY KEY,
	"expires_at" timestamp NOT NULL,
	"token" string NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" string,
	"user_agent" string,
	"user_id" string NOT NULL,
	CONSTRAINT "session_token_key" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" string PRIMARY KEY,
	"name" string NOT NULL,
	"email" string NOT NULL,
	"email_verified" bool DEFAULT false NOT NULL,
	"image" string,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_email_key" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" string PRIMARY KEY,
	"identifier" string NOT NULL,
	"value" string NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "todo" (
	"id" int4 PRIMARY KEY GENERATED ALWAYS AS IDENTITY (INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"text" string NOT NULL,
	"completed" bool DEFAULT false NOT NULL
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;--> statement-breakpoint
CREATE INDEX "account_userId_idx" ON "account" ("user_id");--> statement-breakpoint
CREATE INDEX "session_userId_idx" ON "session" ("user_id");--> statement-breakpoint
CREATE INDEX "verification_identifier_idx" ON "verification" ("identifier");