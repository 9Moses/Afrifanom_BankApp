PGDMP                     	    {            bank_application    15.4    15.4     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false                        0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false                       1262    32832    bank_application    DATABASE     �   CREATE DATABASE bank_application WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'English_United States.1252';
     DROP DATABASE bank_application;
                postgres    false            �            1259    32840    account1    TABLE     �   CREATE TABLE public.account1 (
    id integer NOT NULL,
    account_name character varying,
    account_number character varying,
    account_balance integer
);
    DROP TABLE public.account1;
       public         heap    postgres    false            �            1259    32839    account_detail _id_seq    SEQUENCE     �   ALTER TABLE public.account1 ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public."account_detail _id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    217            �            1259    32834    users    TABLE     w   CREATE TABLE public.users (
    id integer NOT NULL,
    username character varying,
    password character varying
);
    DROP TABLE public.users;
       public         heap    postgres    false            �            1259    32833    users_id_seq    SEQUENCE     �   ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);
            public          postgres    false    215            �          0    32840    account1 
   TABLE DATA           U   COPY public.account1 (id, account_name, account_number, account_balance) FROM stdin;
    public          postgres    false    217   �       �          0    32834    users 
   TABLE DATA           7   COPY public.users (id, username, password) FROM stdin;
    public          postgres    false    215   S                  0    0    account_detail _id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public."account_detail _id_seq"', 8, true);
          public          postgres    false    216                       0    0    users_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.users_id_seq', 1, true);
          public          postgres    false    214            �   z   x�3���OUp��K�444�##C�?.#N�����Dǂ�l��X��,iԕW����&kl�g` R`T��)�2��.O�ME�3�kh`�e��n%X�Ԁ�d'�,S���`� �\0m      �      x�3�LL����442v06����� 4)<     