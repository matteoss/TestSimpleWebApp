--
-- PostgreSQL database dump
--

-- Dumped from database version 12.1
-- Dumped by pg_dump version 14.1

-- Started on 2021-12-20 18:22:35

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 213 (class 1259 OID 24734)
-- Name: color_id_sequence; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.color_id_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.color_id_sequence OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 211 (class 1259 OID 24719)
-- Name: Color; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Color" (
    "ID" integer DEFAULT nextval('public.color_id_sequence'::regclass) NOT NULL,
    "Name" character varying(200) NOT NULL,
    "Definition" character varying(200)
);


ALTER TABLE public."Color" OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 24650)
-- Name: Guest; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Guest" (
    "ID" integer NOT NULL,
    "Name" character varying(250) NOT NULL,
    "Surname" character varying(250) NOT NULL,
    "DateOfBirth" date,
    "DocumentType" character varying(100),
    "DocumentID" character varying(200),
    "Country" character(3),
    "City" character varying(100),
    "Address" character varying(250)
);


ALTER TABLE public."Guest" OWNER TO postgres;

--
-- TOC entry 204 (class 1259 OID 24658)
-- Name: Property; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Property" (
    "ID" integer NOT NULL,
    "Name" character varying(250) NOT NULL
);


ALTER TABLE public."Property" OWNER TO postgres;

--
-- TOC entry 214 (class 1259 OID 24736)
-- Name: res_status_id_sequence; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.res_status_id_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.res_status_id_sequence OWNER TO postgres;

--
-- TOC entry 212 (class 1259 OID 24724)
-- Name: ResStatus; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."ResStatus" (
    "ID" integer DEFAULT nextval('public.res_status_id_sequence'::regclass) NOT NULL,
    "Name" character varying(200) NOT NULL,
    "ColorID" integer NOT NULL
);


ALTER TABLE public."ResStatus" OWNER TO postgres;

--
-- TOC entry 202 (class 1259 OID 24645)
-- Name: Reservation; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Reservation" (
    "ID" integer NOT NULL,
    "Status" character varying(50) NOT NULL,
    "StartDate" date NOT NULL,
    "EndDate" date NOT NULL,
    "ServiceID" integer NOT NULL,
    "PropertyID" integer NOT NULL,
    "GuestID" integer NOT NULL,
    "PreviousStay" integer,
    "NextStay" integer,
    "RoomNumber" integer NOT NULL,
    "ResStatusID" integer NOT NULL
);


ALTER TABLE public."Reservation" OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 24663)
-- Name: Room; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Room" (
    "PropertyID" integer NOT NULL,
    "RoomNumber" integer NOT NULL,
    "RoomTypeID" integer NOT NULL,
    "Status" character varying(100)
);


ALTER TABLE public."Room" OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 24745)
-- Name: room_type_id_sequence; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.room_type_id_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.room_type_id_sequence OWNER TO postgres;

--
-- TOC entry 206 (class 1259 OID 24668)
-- Name: RoomType; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."RoomType" (
    "ID" integer DEFAULT nextval('public.room_type_id_sequence'::regclass) NOT NULL,
    "Name" character varying(100)
);


ALTER TABLE public."RoomType" OWNER TO postgres;

--
-- TOC entry 207 (class 1259 OID 24693)
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    "ID" integer NOT NULL,
    "Username" character varying(100) NOT NULL,
    "Description" character varying(100),
    "Password" character varying(128) NOT NULL,
    "Role" character varying(100)
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- TOC entry 208 (class 1259 OID 24700)
-- Name: guest_id_sequence; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.guest_id_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.guest_id_sequence OWNER TO postgres;

--
-- TOC entry 3013 (class 0 OID 0)
-- Dependencies: 208
-- Name: guest_id_sequence; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.guest_id_sequence OWNED BY public."Guest"."ID";


--
-- TOC entry 209 (class 1259 OID 24703)
-- Name: property_id_sequence; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.property_id_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.property_id_sequence OWNER TO postgres;

--
-- TOC entry 3014 (class 0 OID 0)
-- Dependencies: 209
-- Name: property_id_sequence; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.property_id_sequence OWNED BY public."Property"."ID";


--
-- TOC entry 210 (class 1259 OID 24707)
-- Name: reservation_id_sequence; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reservation_id_sequence
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.reservation_id_sequence OWNER TO postgres;

--
-- TOC entry 3015 (class 0 OID 0)
-- Dependencies: 210
-- Name: reservation_id_sequence; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reservation_id_sequence OWNED BY public."Reservation"."ID";


--
-- TOC entry 2841 (class 2604 OID 24702)
-- Name: Guest ID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Guest" ALTER COLUMN "ID" SET DEFAULT nextval('public.guest_id_sequence'::regclass);


--
-- TOC entry 2842 (class 2604 OID 24706)
-- Name: Property ID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Property" ALTER COLUMN "ID" SET DEFAULT nextval('public.property_id_sequence'::regclass);


--
-- TOC entry 2840 (class 2604 OID 24709)
-- Name: Reservation ID; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Reservation" ALTER COLUMN "ID" SET DEFAULT nextval('public.reservation_id_sequence'::regclass);


--
-- TOC entry 3003 (class 0 OID 24719)
-- Dependencies: 211
-- Data for Name: Color; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Color" ("ID", "Name", "Definition") VALUES (1, 'Color 1', 'color_cc7699');
INSERT INTO public."Color" ("ID", "Name", "Definition") VALUES (2, 'Color 2', 'color_b59caa');
INSERT INTO public."Color" ("ID", "Name", "Definition") VALUES (3, 'Color 3', 'color_bba3c8');
INSERT INTO public."Color" ("ID", "Name", "Definition") VALUES (4, 'Color 4', 'color_f6978a');
INSERT INTO public."Color" ("ID", "Name", "Definition") VALUES (5, 'Color 5', 'color_fab27e');


--
-- TOC entry 2995 (class 0 OID 24650)
-- Dependencies: 203
-- Data for Name: Guest; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Guest" ("ID", "Name", "Surname", "DateOfBirth", "DocumentType", "DocumentID", "Country", "City", "Address") VALUES (1, 'Ivo', 'Ivić', '1990-01-01', NULL, NULL, 'HRV', 'Buje', 'Vladimira Nazora');
INSERT INTO public."Guest" ("ID", "Name", "Surname", "DateOfBirth", "DocumentType", "DocumentID", "Country", "City", "Address") VALUES (2, 'Marko', 'Marković', '2000-03-23', 'Osobna', '12345678', 'HRV', 'Rovinj', 'Brolo');
INSERT INTO public."Guest" ("ID", "Name", "Surname", "DateOfBirth", "DocumentType", "DocumentID", "Country", "City", "Address") VALUES (3, 'Josipa', 'Horvat', '1980-08-31', NULL, NULL, 'HRV', 'Pula', NULL);
INSERT INTO public."Guest" ("ID", "Name", "Surname", "DateOfBirth", "DocumentType", "DocumentID", "Country", "City", "Address") VALUES (5, 'Jackie', 'Smith', '2021-09-22', '', '', 'USA', '', '');
INSERT INTO public."Guest" ("ID", "Name", "Surname", "DateOfBirth", "DocumentType", "DocumentID", "Country", "City", "Address") VALUES (12, 'Ivo', 'Ivić', '1990-01-01', NULL, NULL, 'HRV', 'Buje', 'Vladimira Nazora');
INSERT INTO public."Guest" ("ID", "Name", "Surname", "DateOfBirth", "DocumentType", "DocumentID", "Country", "City", "Address") VALUES (13, 'Marko', 'Marković', '2000-03-23', 'Osobna', '12345678', 'HRV', 'Rovinj', 'Brolo');
INSERT INTO public."Guest" ("ID", "Name", "Surname", "DateOfBirth", "DocumentType", "DocumentID", "Country", "City", "Address") VALUES (14, 'Johnny', 'Smith', '1970-05-12', NULL, NULL, 'USA', 'Memphis', NULL);
INSERT INTO public."Guest" ("ID", "Name", "Surname", "DateOfBirth", "DocumentType", "DocumentID", "Country", "City", "Address") VALUES (15, 'Eddy', 'Smith', '2021-09-16', NULL, '9345i2345', '   ', NULL, NULL);
INSERT INTO public."Guest" ("ID", "Name", "Surname", "DateOfBirth", "DocumentType", "DocumentID", "Country", "City", "Address") VALUES (16, 'Josipa', 'Horvat', '1980-08-31', NULL, NULL, 'HRV', 'Pula', NULL);
INSERT INTO public."Guest" ("ID", "Name", "Surname", "DateOfBirth", "DocumentType", "DocumentID", "Country", "City", "Address") VALUES (17, 'Jackie', 'Smith', '2021-09-22', NULL, NULL, 'USA', NULL, NULL);
INSERT INTO public."Guest" ("ID", "Name", "Surname", "DateOfBirth", "DocumentType", "DocumentID", "Country", "City", "Address") VALUES (18, 'Maja', 'Horvat', '1998-09-12', 'Osobna', '80849302', 'HRV', NULL, NULL);
INSERT INTO public."Guest" ("ID", "Name", "Surname", "DateOfBirth", "DocumentType", "DocumentID", "Country", "City", "Address") VALUES (10, 'Maja', 'Horvat', '1998-09-12', 'Osobna', '808493023', 'HRV', '', '');
INSERT INTO public."Guest" ("ID", "Name", "Surname", "DateOfBirth", "DocumentType", "DocumentID", "Country", "City", "Address") VALUES (8, 'Eddy', 'Smith', '2021-09-16', '', '9345i23453', '   ', '', '');
INSERT INTO public."Guest" ("ID", "Name", "Surname", "DateOfBirth", "DocumentType", "DocumentID", "Country", "City", "Address") VALUES (4, 'Johnny', 'Smith', '1970-05-12', NULL, '1231', 'USA', 'Memphis', NULL);
INSERT INTO public."Guest" ("ID", "Name", "Surname", "DateOfBirth", "DocumentType", "DocumentID", "Country", "City", "Address") VALUES (19, 'Mateo', 'Glavicic', '1994-02-15', '', '9453q4a', '   ', '', '');
INSERT INTO public."Guest" ("ID", "Name", "Surname", "DateOfBirth", "DocumentType", "DocumentID", "Country", "City", "Address") VALUES (20, 'michael', 'jackson', '1992-01-01', '', '1234', '   ', '', '');
INSERT INTO public."Guest" ("ID", "Name", "Surname", "DateOfBirth", "DocumentType", "DocumentID", "Country", "City", "Address") VALUES (21, 'will', 'smith', '1932-01-01', '', '56234', '   ', '', '');
INSERT INTO public."Guest" ("ID", "Name", "Surname", "DateOfBirth", "DocumentType", "DocumentID", "Country", "City", "Address") VALUES (11, 'a', 'aaa', '1911-11-11', '', '01234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567891', '   ', '', '');


--
-- TOC entry 2996 (class 0 OID 24658)
-- Dependencies: 204
-- Data for Name: Property; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Property" ("ID", "Name") VALUES (1, 'Main Hotel Pazin');
INSERT INTO public."Property" ("ID", "Name") VALUES (6, 'Hotel Buje');
INSERT INTO public."Property" ("ID", "Name") VALUES (7, 'Hotel Umag');
INSERT INTO public."Property" ("ID", "Name") VALUES (9, 'Main Hotel Pazin');
INSERT INTO public."Property" ("ID", "Name") VALUES (10, 'Main Hotel Pazin');


--
-- TOC entry 3004 (class 0 OID 24724)
-- Dependencies: 212
-- Data for Name: ResStatus; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."ResStatus" ("ID", "Name", "ColorID") VALUES (2, 'Reserved', 1);
INSERT INTO public."ResStatus" ("ID", "Name", "ColorID") VALUES (3, 'Checked in', 2);
INSERT INTO public."ResStatus" ("ID", "Name", "ColorID") VALUES (4, 'Checked out', 3);
INSERT INTO public."ResStatus" ("ID", "Name", "ColorID") VALUES (5, 'Reserved - optional', 5);


--
-- TOC entry 2994 (class 0 OID 24645)
-- Dependencies: 202
-- Data for Name: Reservation; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Reservation" ("ID", "Status", "StartDate", "EndDate", "ServiceID", "PropertyID", "GuestID", "PreviousStay", "NextStay", "RoomNumber", "ResStatusID") VALUES (3, 'CheckedIn', '2021-09-07', '2021-10-15', 1, 1, 3, NULL, NULL, 3, 2);
INSERT INTO public."Reservation" ("ID", "Status", "StartDate", "EndDate", "ServiceID", "PropertyID", "GuestID", "PreviousStay", "NextStay", "RoomNumber", "ResStatusID") VALUES (1, 'Reserved', '2021-11-01', '2021-11-10', 1, 1, 12, NULL, NULL, 1, 2);
INSERT INTO public."Reservation" ("ID", "Status", "StartDate", "EndDate", "ServiceID", "PropertyID", "GuestID", "PreviousStay", "NextStay", "RoomNumber", "ResStatusID") VALUES (7, 'Reserved', '2021-10-15', '2021-10-30', 2, 1, 4, NULL, NULL, 4, 2);
INSERT INTO public."Reservation" ("ID", "Status", "StartDate", "EndDate", "ServiceID", "PropertyID", "GuestID", "PreviousStay", "NextStay", "RoomNumber", "ResStatusID") VALUES (2, 'CheckedIn', '2021-09-07', '2021-09-30', 1, 1, 2, NULL, NULL, 4, 3);
INSERT INTO public."Reservation" ("ID", "Status", "StartDate", "EndDate", "ServiceID", "PropertyID", "GuestID", "PreviousStay", "NextStay", "RoomNumber", "ResStatusID") VALUES (4, 'Reserved', '2021-10-15', '2021-11-10', 5, 1, 4, NULL, NULL, 2, 4);
INSERT INTO public."Reservation" ("ID", "Status", "StartDate", "EndDate", "ServiceID", "PropertyID", "GuestID", "PreviousStay", "NextStay", "RoomNumber", "ResStatusID") VALUES (13, 'Reserved', '2021-01-01', '2021-01-01', 1, 1, 13, NULL, NULL, 2, 3);
INSERT INTO public."Reservation" ("ID", "Status", "StartDate", "EndDate", "ServiceID", "PropertyID", "GuestID", "PreviousStay", "NextStay", "RoomNumber", "ResStatusID") VALUES (5, 'Reserved', '2021-10-07', '2021-10-09', 4, 1, 1, NULL, NULL, 2, 5);
INSERT INTO public."Reservation" ("ID", "Status", "StartDate", "EndDate", "ServiceID", "PropertyID", "GuestID", "PreviousStay", "NextStay", "RoomNumber", "ResStatusID") VALUES (6, 'Reserved', '2021-10-01', '2021-10-10', 3, 1, 2, NULL, NULL, 1, 4);


--
-- TOC entry 2997 (class 0 OID 24663)
-- Dependencies: 205
-- Data for Name: Room; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."Room" ("PropertyID", "RoomNumber", "RoomTypeID", "Status") VALUES (1, 1, 1, NULL);
INSERT INTO public."Room" ("PropertyID", "RoomNumber", "RoomTypeID", "Status") VALUES (1, 2, 1, NULL);
INSERT INTO public."Room" ("PropertyID", "RoomNumber", "RoomTypeID", "Status") VALUES (1, 3, 1, NULL);
INSERT INTO public."Room" ("PropertyID", "RoomNumber", "RoomTypeID", "Status") VALUES (1, 4, 1, NULL);
INSERT INTO public."Room" ("PropertyID", "RoomNumber", "RoomTypeID", "Status") VALUES (1, 5, 1, NULL);
INSERT INTO public."Room" ("PropertyID", "RoomNumber", "RoomTypeID", "Status") VALUES (6, 4, 3, NULL);
INSERT INTO public."Room" ("PropertyID", "RoomNumber", "RoomTypeID", "Status") VALUES (6, 12, 3, NULL);
INSERT INTO public."Room" ("PropertyID", "RoomNumber", "RoomTypeID", "Status") VALUES (1, 11, 2, NULL);
INSERT INTO public."Room" ("PropertyID", "RoomNumber", "RoomTypeID", "Status") VALUES (9, 43, 3, NULL);
INSERT INTO public."Room" ("PropertyID", "RoomNumber", "RoomTypeID", "Status") VALUES (1, 6, 1, '111');


--
-- TOC entry 2998 (class 0 OID 24668)
-- Dependencies: 206
-- Data for Name: RoomType; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."RoomType" ("ID", "Name") VALUES (1, 'Double Room');
INSERT INTO public."RoomType" ("ID", "Name") VALUES (3, 'App');
INSERT INTO public."RoomType" ("ID", "Name") VALUES (2, 'Suite ');


--
-- TOC entry 2999 (class 0 OID 24693)
-- Dependencies: 207
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO public."User" ("ID", "Username", "Description", "Password", "Role") VALUES (1, 'mateo', 'password: "lozinka"', 'AQAAJxAAAAAQHN+bPC7/nMXqGKBMUUGgLqdWTYFn7VGFpWY0P8BrODjSALaHClXxOuflrH3hEz4n', 'Admin');
INSERT INTO public."User" ("ID", "Username", "Description", "Password", "Role") VALUES (0, 'test', 'test ghj', 'AQAAJxAAAAAQmgm0E7Nghh8+lQPzzx1+ElUXFplBdmBRqjm7laCe2H586neIgBbpiDmzB8KGzn/b', 'User');


--
-- TOC entry 3016 (class 0 OID 0)
-- Dependencies: 213
-- Name: color_id_sequence; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.color_id_sequence', 5, true);


--
-- TOC entry 3017 (class 0 OID 0)
-- Dependencies: 208
-- Name: guest_id_sequence; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.guest_id_sequence', 21, true);


--
-- TOC entry 3018 (class 0 OID 0)
-- Dependencies: 209
-- Name: property_id_sequence; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.property_id_sequence', 18, true);


--
-- TOC entry 3019 (class 0 OID 0)
-- Dependencies: 214
-- Name: res_status_id_sequence; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.res_status_id_sequence', 6, true);


--
-- TOC entry 3020 (class 0 OID 0)
-- Dependencies: 210
-- Name: reservation_id_sequence; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reservation_id_sequence', 13, true);


--
-- TOC entry 3021 (class 0 OID 0)
-- Dependencies: 215
-- Name: room_type_id_sequence; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.room_type_id_sequence', 7, true);


--
-- TOC entry 2859 (class 2606 OID 24723)
-- Name: Color Color_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Color"
    ADD CONSTRAINT "Color_pkey" PRIMARY KEY ("ID");


--
-- TOC entry 2849 (class 2606 OID 24657)
-- Name: Guest Guest_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Guest"
    ADD CONSTRAINT "Guest_pkey" PRIMARY KEY ("ID");


--
-- TOC entry 2851 (class 2606 OID 24662)
-- Name: Property Object_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Property"
    ADD CONSTRAINT "Object_pkey" PRIMARY KEY ("ID");


--
-- TOC entry 2861 (class 2606 OID 24728)
-- Name: ResStatus ResStatus_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ResStatus"
    ADD CONSTRAINT "ResStatus_pkey" PRIMARY KEY ("ID");


--
-- TOC entry 2847 (class 2606 OID 24649)
-- Name: Reservation Reservation_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Reservation"
    ADD CONSTRAINT "Reservation_pkey" PRIMARY KEY ("ID");


--
-- TOC entry 2855 (class 2606 OID 24672)
-- Name: RoomType RoomType_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."RoomType"
    ADD CONSTRAINT "RoomType_pkey" PRIMARY KEY ("ID");


--
-- TOC entry 2853 (class 2606 OID 24667)
-- Name: Room Room_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Room"
    ADD CONSTRAINT "Room_pkey" PRIMARY KEY ("PropertyID", "RoomNumber");


--
-- TOC entry 2857 (class 2606 OID 24697)
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY ("ID");


--
-- TOC entry 2867 (class 2606 OID 24729)
-- Name: ResStatus fk_Color; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."ResStatus"
    ADD CONSTRAINT "fk_Color" FOREIGN KEY ("ColorID") REFERENCES public."Color"("ID") NOT VALID;


--
-- TOC entry 2863 (class 2606 OID 24683)
-- Name: Reservation fk_Guest; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Reservation"
    ADD CONSTRAINT "fk_Guest" FOREIGN KEY ("GuestID") REFERENCES public."Guest"("ID");


--
-- TOC entry 2864 (class 2606 OID 24688)
-- Name: Reservation fk_Property; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Reservation"
    ADD CONSTRAINT "fk_Property" FOREIGN KEY ("PropertyID") REFERENCES public."Property"("ID");


--
-- TOC entry 2865 (class 2606 OID 24740)
-- Name: Reservation fk_ResStatus; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Reservation"
    ADD CONSTRAINT "fk_ResStatus" FOREIGN KEY ("ResStatusID") REFERENCES public."ResStatus"("ID") NOT VALID;


--
-- TOC entry 2862 (class 2606 OID 24678)
-- Name: Reservation fk_Room; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Reservation"
    ADD CONSTRAINT "fk_Room" FOREIGN KEY ("PropertyID", "RoomNumber") REFERENCES public."Room"("PropertyID", "RoomNumber");


--
-- TOC entry 2866 (class 2606 OID 24673)
-- Name: Room fk_RoomType; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Room"
    ADD CONSTRAINT "fk_RoomType" FOREIGN KEY ("RoomTypeID") REFERENCES public."RoomType"("ID");


-- Completed on 2021-12-20 18:22:35

--
-- PostgreSQL database dump complete
--

