-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 11, 2019 at 08:32 PM
-- Server version: 10.1.37-MariaDB
-- PHP Version: 7.3.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `twenty_five_kitchen`
--

-- --------------------------------------------------------

--
-- Table structure for table `comments`
--

CREATE TABLE `comments` (
  `ID` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `post_id` int(11) NOT NULL,
  `text` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`ID`, `user_id`, `post_id`, `text`, `date`) VALUES
(1, 1, 4, 'Did not like it that much...', '2019-03-02 12:23:20'),
(2, 4, 4, 'Yeah, me neither.', '2019-03-03 13:49:17'),
(3, 5, 6, 'One of the best meals I have eaten in a long time.', '2019-05-02 18:21:38'),
(5, 1, 1, 'My GF loves buns.', '2019-05-26 14:46:48'),
(7, 1, 3, 'Once tried it, tastes perfect.', '2019-05-26 14:50:36');

-- --------------------------------------------------------

--
-- Table structure for table `food_quotes`
--

CREATE TABLE `food_quotes` (
  `ID` int(11) NOT NULL,
  `text` varchar(300) COLLATE utf8_unicode_ci NOT NULL,
  `SRBtext` varchar(300) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `food_quotes`
--

INSERT INTO `food_quotes` (`ID`, `text`, `SRBtext`) VALUES
(1, 'All you need is love. But a little chocolate now and then doesn\'t hurt.', 'Sve što nam treba je ljubav. Ali malo čokolade kad tad ne bi naškodilo.'),
(2, 'I love you like a fat kid loves cake!', 'Volim te kao što malo dete voli tortu!'),
(3, 'One cannot think well, love well, sleep well, if one has not dined well.', 'Osoba ne može da razmišlja lepo, da voli lepo, da spava lepo, ako nije jela dobro.'),
(4, 'Ask not what you can do for your country. Ask what is for lunch.', 'Ne pitajte šta možete da uradite za Vašu državu. Pitajte šta ima za ručak.'),
(5, 'After a good dinner one can forgive anybody, even ones own relations.', 'Nakon dobre večere, osoba može oprostiti svakome, čak i vlastitim odnosima.'),
(6, 'Pull up a chair. Take a taste. Come join us. Life is so endlessly delicious.', 'Privuci stolicu. Probaj zalogaj. Dođi pridruži nam se. Život je tako bezgranično ukusan.'),
(7, 'Seize the moment. Remember all those women on the Titanic who waved off the dessert cart.', 'Uhvati trenutak. Seti se svih žena koje su na Titaniku mahale kolicima sa dezertom.'),
(8, 'There is no love sincerer than the love of food.', 'Nema ljubavi iskrenije od ljubavi prema hrani.'),
(9, 'I cook with wine, sometimes I even add it to the food.', 'Kuvam vinom, nekad ga čak i dodam u jelo.'),
(10, 'Cakes are healthy too, you just eat a small slice.', 'Torte su zdrave takođe, samo moraš pojesti malo parče.'),
(11, 'Let food be thy medicine and medicine be thy food.', 'Neka ti hrana bude lek i lek neka ti bude hrana.'),
(12, 'Probably one of the most private things in the world is an egg before it is broken.', 'Jedna od najprivatnijih stvari na svetu je najverovatnije jaje pre nego što se polomi.'),
(13, 'Humor keeps us alive. Humor and food. Don not forget food. You can go a week without laughing.', 'Smeh nas održava u životu. Smeh i hrana. Ne zaboravite hranu. Možemo izdržati nedelju dana bez smejanja.'),
(14, 'The only time to eat diet food is while you are waiting for the steak to cook.', 'Jedino vreme da se jede dijetalna hrana je dok čekaš šniclu da se skuva.'),
(15, 'I am a better person when I have less on my plate.', 'Ja sam bolja osoba kad imam manje na svom tanjiru.'),
(16, 'We must have a pie. Stress cannot exist in the presence of a pie.', 'Moramo pojesti pitu. Stres ne može postojati u prisustvu pite.'),
(17, 'Part of the secret of success in life is to eat what you like and let the food fight it out inside.', 'Deo tajni o uspešnom životu je  da jedeš šta voliš i da pustiš hranu da se izbori iznutra.'),
(18, 'Ice cream is exquisite. What a pity it is not illegal.', 'Sladoled je neverovatan. Šteta što nije ilegalan.'),
(19, 'I hate people who are not serious about meals. It is so shallow of them.', 'Mrzim ljude koji nisu ozbiljni sa svojom hranom. To je tako plitko od njih.'),
(20, 'Anything is good if it is made of chocolate.', 'Sve je dobro ukoliko je napravljeno od čokolade.'),
(21, 'All sorrows are less with bread.', 'Sve tuge su manje sa hlebom.'),
(22, 'The thought of two thousand people crunching celery at the same time horrified me.', 'Misao o dve hiljade ljudi koji krckaju ovsene pahuljice u isto vreme me plaši.'),
(23, 'The main facts in human life are five: birth, food, sleep, love and death.', 'Glavni faktori u ljudskom životu su sledećih pet: rođenje, hrana, spavanje, ljubav i smrt.'),
(24, 'He was a bold man that first ate an oyster.', 'Bio je hrabar čovek koji je prvi pojeo ostrigu.'),
(25, 'No man is lonely while eating spaghetti: it requires so much attention.', 'Nijedan čovek nije usamljen kad jede špagete: one zahtevaju previše pažnje.'),
(26, 'Do not let love interfere with your appetite. It never does with mine.', 'Ne dozvoli da se ljubav meša sa tvojim apetitom. Nikad se ne meša sa mojim.'),
(27, 'Fools make feasts and wise men eat them.', 'Budale prave gozbe a pametni ljudi ih jedu.'),
(28, 'Someone who eats pancakes and jam ca not be so awfully dangerous. You can talk to him.', 'Osoba koja jede palačinke i džem ne može biti toliko opasna. Idi pričaj sa njim.');

-- --------------------------------------------------------

--
-- Table structure for table `navigation`
--

CREATE TABLE `navigation` (
  `ID` int(11) NOT NULL,
  `Title` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `SRBTitle` char(30) COLLATE utf8_unicode_ci NOT NULL,
  `Link` varchar(60) COLLATE utf8_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `navigation`
--

INSERT INTO `navigation` (`ID`, `Title`, `SRBTitle`, `Link`) VALUES
(1, 'Home', 'Početna', 'main_template'),
(2, 'Appetizer', 'Predjelo', 'appetizer'),
(3, 'Main Course', 'Glavno Jelo', 'main_course'),
(4, 'Dessert', 'Dezert', 'dessert'),
(5, 'Contact', 'Kontakt', 'contact_template');

-- --------------------------------------------------------

--
-- Table structure for table `newsletter_subscribers`
--

CREATE TABLE `newsletter_subscribers` (
  `ID` int(11) NOT NULL,
  `email` varchar(50) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `newsletter_subscribers`
--

INSERT INTO `newsletter_subscribers` (`ID`, `email`) VALUES
(9, 'ansfan@nk'),
(1, 'nekimanijak@gmail.com'),
(4, 'nesto@nesto.com'),
(2, 'nestobzvz@gmail.com'),
(6, 'ngu@oio'),
(5, 'nikola.nini@gmail.com'),
(8, 'nw@mfs');

-- --------------------------------------------------------

--
-- Table structure for table `pictures`
--

CREATE TABLE `pictures` (
  `ID` int(11) NOT NULL,
  `src` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `alt` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `SRBalt` varchar(30) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `pictures`
--

INSERT INTO `pictures` (`ID`, `src`, `alt`, `SRBalt`) VALUES
(1, 'assets/images/recipes/food_1.jpg', 'Buns 1', 'Kiflice 1'),
(2, 'assets/images/recipes/food_2.jpg', 'Buns 2', 'Kiflice 2'),
(3, 'assets/images/recipes/food_3.jpg', 'Buns 3', 'Kiflice 3'),
(4, 'assets/images/recipes/food_4.jpg', 'Milan risotto 1', 'Milanski rižoto 1'),
(5, 'assets/images/recipes/food_5.jpg', 'Milan risotto 2', 'Milanski rižoto 2'),
(6, 'assets/images/recipes/food_6.jpg', 'Milan risotto 3', 'Milanski rižoto 3'),
(7, 'assets/images/recipes/food_7.jpg', 'Baked tomato 1', 'Pečen paradajz 1'),
(8, 'assets/images/recipes/food_8.jpg', 'Baked tomato 2', 'Pečen paradajz 2'),
(9, 'assets/images/recipes/food_9.jpg', 'Broccoli Orecchiette 1', 'Brokoli Orecchiette 1'),
(10, 'assets/images/recipes/food_10.jpg', 'Broccoli Orecchiette 2', 'Brokoli Orecchiette 2'),
(11, 'assets/images/recipes/food_11.jpg', 'Broccoli Orecchiette 3', 'Brokoli Orecchiette 3'),
(12, 'assets/images/recipes/food_12.jpg', 'Pizza roll 1', 'Pizza rolat 1'),
(13, 'assets/images/recipes/food_13.jpg', 'Pizza roll 2', 'Pizza rolat 2'),
(14, 'assets/images/recipes/food_14.jpg', 'Stewed beans 1', 'Pohovana boranija 1'),
(15, 'assets/images/recipes/food_15.jpg', 'Stewed beans 2', 'Pohovana boranija 2'),
(16, 'assets/images/recipes/food_16.jpg', 'Stuffed peppers 1', 'Punjene paprike 1'),
(17, 'assets/images/recipes/food_17.jpg', 'Stuffed peppers 2', 'Punjene paprike 2'),
(18, 'assets/images/recipes/food_18.jpg', 'Stuffed peppers 3', 'Punjene paprike 3'),
(19, 'assets/images/recipes/food_19.jpg', 'Fried chicken 1', 'Pohovana piletina 1'),
(20, 'assets/images/recipes/food_20.jpg', 'Fried chicken 2', 'Pohovana piletina 2'),
(21, 'assets/images/recipes/food_21.jpg', 'Beef stew 1', 'Juneći gulaš 1'),
(22, 'assets/images/recipes/food_22.jpg', 'Beef stew 2', 'Juneći gulaš 2'),
(23, 'assets/images/recipes/food_23.jpg', 'Chocolate cake 1', 'Čokoladni kolač 1'),
(24, 'assets/images/recipes/food_24.jpg', 'Blueberry pie 1', 'Pita od borovnica 1'),
(25, 'assets/images/recipes/food_25.jpg', 'Blueberry pie 2', 'Pita od borovnica 2'),
(26, 'assets/images/recipes/food_26.jpg', 'Blueberry pie 3', 'Pita od borovnica 3'),
(27, 'assets/images/recipes/food_27.jpg', 'Muhallebi 1', 'Muhallebi 1'),
(28, 'assets/images/recipes/food_28.jpg', 'Muhallebi 2', 'Muhallebi 2'),
(29, 'assets/images/recipes/food_29.jpg', 'Blinis with honey 1', 'Blini sa medom 1');

-- --------------------------------------------------------

--
-- Table structure for table `post`
--

CREATE TABLE `post` (
  `ID` int(11) NOT NULL,
  `type_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `title` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `SRBtitle` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `text` varchar(900) COLLATE utf8_unicode_ci NOT NULL,
  `SRBtext` varchar(900) COLLATE utf8_unicode_ci NOT NULL,
  `date` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `post`
--

INSERT INTO `post` (`ID`, `type_id`, `user_id`, `title`, `SRBtitle`, `text`, `SRBtext`, `date`) VALUES
(1, 2, 4, 'Buns', 'Kiflice', 'Mix dough, roll out the circle, cut the triangles, stir the buns. While the oven is warming up to 180C, the buns are \"resting\". Cover with an egg and bake for 15 minutes.', 'Zamesite testo, razvaljajte krug, režite trokutiće, motajte kiflice. Dok se pećnica zagrije na 180C kiflice se “odmaraju”. Premazati jajetom i peći 15 minuta.', '2019-04-01 07:10:33'),
(2, 2, 5, 'Milan risotto', 'Milanski rižoto', 'Put the soup cubes in the boiling water and cook for about 5 minutes. On a hot butter shortly cook the chopped onion and gently rub it with soup. Add rinsed rice, brush it briefly and rub it gradually by pouring hot soup with continuous stirring. At the end of the stew, add wine, Vegeta and saffron, and then parmesan.', 'U kipeću vodu stavite kocke za supu i kuvajte oko 5 minuta. Na ugrejanom maslacu kratko ispecite naseckani luk i lagano ga dinstajte podlivajući supom. Dodajte opranu rižu, kratko je popecite i dinstajte postupno je zalivajući vrućom supom uz neprekidno mešanje. Pred kraj dinstanja dodajte vino, Vegetu i šafran, a zatim parmesan.', '2019-02-01 18:39:09'),
(3, 2, 3, 'Baked tomato', 'Pečen paradajz', 'Heat the oven to 150 to 160 * C. Washed and dried tomatoes cut along the length, if the tomatoes are round , then cut across. Put them on a plate, on which you have previously put the baking paper. Put garlic, dried oregano, salt, pepper and olive oil in the bowl and mix well. With a baking brush or a spoon, cover each side of the tomatoes. Bake about 1 1/2 to 2 hours and periodically check that it does not burn, if it burns, reduce the temperature. Quiet baked tomatoes you can stack in a jar, sprinkle with olive oil and keep in the refrigerator until use. Serve with fresh basil.', 'Zagrejati rernu na 150 do 160*C. Opran i osušen paradajz iseći po dužini, ako je okrugao paradajz, onda seći popreko. Staviti ih na pleh, na koji ste prethodno stavili papir za pečenje. U činiju staviti propasirani beli luk, suvi oregano, soli, bibera i maslinovog ulja i dobro sve izmešajte. Četkom za pečenje ili kašikom, premazati obilato svaku sečenu stranu paradajza. Peći oko 1 1/2 do 2 sata i povremeno proveriti da vam ne izgori, ako gori, smanjiti temperaturu. Tiho pečeni paradajz možete naslagati u teglicu, preliti maslinovim uljem i držati u frižideru do upotrebe. Servirati sa svežim bosiljkom.', '2019-03-05 17:19:38'),
(4, 2, 2, 'Broccoli Orecchiette', 'Brokoli Orecchiette', 'Wash broccoli and separate on flowers. Cook pasta and broccoli together in salted water. Decant, part of the liquid in which it cooked leave. On the olive oil, briefly cook on small parts sliced garlic. Mix cooked pasta and broccoli and just briefly cook. If necessary, add some of the liquid in which it was cooked. Serve right now and add the rendered Parmesan.', 'Brokoli operite i razdvojite na cvetiće. Testeninu i brokoli skuvajte zajedno u posoljenoj vodi. Ocedite, deo tečnosti u kojoj se kuvalo ostavite sa strane. Na maslinovom ulju kratko prodinstajte na fetice narezan beli luk. Umešajte skuvanu testeninu i brokoli i samo kratko prodinstajte. Po potrebi dodajte malo tečnosti u kojoj se kuvalo. Poslužite odmah i dodajte rendani parmezan.', '2019-02-15 14:12:07'),
(5, 2, 5, 'Pizza roll', 'Pizza rolat', 'Moisten the cream and eggs with a little salt. Cut salami on thin discs. Crust should have 12 sheets. Split them to get 2 times 6 sheets. Put the first 2 lists on the right. Overcoat with a little wet sour cream with eggs, then grinding with the crust, so rub it with ketchup and sprinkl with a little oregano, and then over the crust, and grease it with a sour cream and eggs, and you sort the salami, put the crust over again and 150g of cheese on it and on the top put crust which you lubricate with sour cream and eggs. Take everything into the roll. Roll up the roller with sour cream and eggs and put in a lubricant and bake at 200 degrees for about 20 minutes. until it\'s fine.', 'Umutite pavlaku i jaja sa malo soli. Salamu isečete na tanke kolutove. Kore bi trebalo da imaju 12 listova. Podeliti ih da dobijete 2 puta po 6 listova. Na tacnu staviti prvo 2 lista. Preko premazati malo umućene pavlake sa jajima, pa odgore kora, pa je premažete kečapom i pospete malo origana, pa preko opet kora i nju namažete pavlakom i jajima i poređate salamu, preko opet stavite koru i na nju narendate 150g kačkavanja i preko kora koju namažete pavlakom i jajima.To sve zavijte u rolat. Rolate premažite sa pavlakom i jajima i stavite u podmazan pleh i pečite na 200 stepeni oko 20 min. dok  fino ne porumeni.', '2019-01-02 13:12:45'),
(6, 3, 2, 'Stewed beans', 'Pohovana boranija', 'Heaten the oil and rub it on a slightly sliced garlic. Add, to the thicker cut carrot, meat cut into squares, sprinkle, add the seasonings and leave until the meat slightly softens. Add cleaned, and about 5 cm cut bean, then constantly cook it, adding water. When all meat and vegetables become soft, sprinkle them with flour, with a little red pepper, grind well, when the flour begins to stack on the bottom, sprinkle with water, as much as you like it to be dense, I do not do too much taste. Add the potatoes cut into middle sized cubes and cook until the potatoes soften. When everything is fine, add a dried tomato. Mix it good and cook it a bit more. At the end, add a sliced leaf of parsley and onion, cover and immediately extinguish the fire, leave it for another 10 minutes. Serve hot with bread.', 'Ugrejte ulje i na njemu zažutite sitno seckan luk. Dodajte na deblje kolutiće izrezanu šargarepu, meso narezano na kockice, posolite, dodajte vegetu i dinstajte dok meso malo ne omekša. Dodajte očišćene, oprane i na oko 5 cm boraniju, dalje dinstajte stalno podlivajući vodom. Kad svo meso I povrće postane mekano, pospite ih brašnom, s malo crvene paprike, dobro promešajte, prepržite brašno, kad se počne lepiti za dno, podlijte vodom, koliko volite da bude gusto, ja ne radim previše gusto. Dodajte krompir izrezan na srednje kockice i kuvajte dok krompir ne omekša. Kad je sve lepo kuvano, dodajte seckan paradajz. Dobro promešajte i još malo prokuvajte. Na samom kraju dodajte seckani list peršuna i beli luk, poklopite i odmah ugasite vatru, ostavite tako još 10 minuta. Poslužite vruće sa hlebom.', '2019-03-15 15:21:34'),
(7, 3, 4, 'Stuffed peppers', 'Punjene paprike', 'Peel the peppers from the seed, hold it for the stalk and turn your thumb in the circle around the tip of the spindle, rotating it in your hand and thus obtaining a hole from which it is easy to remove the seeds. Place one of the oatmeal meat in one bowl and add spices to it. Mix good, try to see if it is a good taste. Fill the peppers with mixture. Place the oil in the pot of potato and sprinkle it on with flour. Add tomatoes. Add water until you get the desired sauce density. In sauce add stuffed peppers celery branches, if you do not have celery branches, you can also add a celery root. Cover and cook for an hour and a half in a pot. Serve hot with plenty of sauce.', 'Paprike očistite od semenki, tako da je držite za peteljku i vrtite palcem u krug oko vrha peteljke, vrteći je u ruci i tako dobijete rupu iz koje je lako izvaditi semenke. U jednu činiju stavite mleveno meso i redom mu dodajte začine. Dobro izmešajte ,probajte da vidite da li je dobrog ukusa. Smesom napunite paprike . U lonac za kuvanje stavite ulje i prepržite na njemu brašno. U to dodajte paradajz. Dolivajte vode, sve dok ne dobijete željenu gustoću sosa. U sos stavite punjene paprike i grančicu celera, ako nemate grančice celera, dobar je i koren celera. Poklopite i kuvajte sat i po u loncu. Poslužite vruće sa dosta sosa.', '2019-04-06 18:35:54'),
(8, 3, 2, 'Fried chicken', 'Pohovana piletina', 'Clean the chicken, wash, dry and soak up. Mix crumbs with grated cheese, it gives a special taste, and smell . Add a good fist of grated cheese. Lightly add flour, roll in the egg, then crumble and just briefly sprinkle on medium-heated hot oil until the golden coat is caught. Remove the chicken from the oil, put it on paper towels to remove oil, and then serve in a baking pan on which we put a cake grid so that oil is drained while cooking, not collect in meat. Order the chicken covered with aluminum foil and bake for about 40 minutes in a well-heated oven. Check with a toothpick or a skewer if the chicken is finished, remove the foil and let it stand and serve as desired.', 'Piletinu očistiti, oprati, osušiti i posoliti. Mrvice pomešati sa rendanim kačkavaljem, to daje poseban ukus, a i miris. Dodajte dobru šaku rendanog kačkavalja. Lagano dodati brašno, uvaljati u jaje, pa u mrvice i samo kratko zapržiti na ulju zagrejanom na srednjoj vatri, dok se uhvati zlatkasta korica .Piletinu izvaditi iz ulja, staviti na papirnate maramice da se ulje ocedi, pa onda sve poslužiti u tepsiju na koju smo stavili rešetku od kolača ,tako da se prilikom pečenja ulje cedi, a ne da se kupi u meso. Poslaganu piletinu pokriti aluminijskom foliom i peći nekih 40 minuta u dobro zagrejanoj rerni. Proveriti čačkalicom ili ražnjićem ako je piletina gotova, skloniti foliju pustiti malo da odstoji i poslužiti po želji.', '2019-01-15 15:40:40'),
(9, 3, 3, 'Beef stew', 'Juneći gulaš', 'Onion and garlic are cut into small pieces or, as I put in a chopper to chop well and then frz on a little oil. While frying the onion, if necessary, moisten with water to prevent burning. When the onion is finished, add the meat, salt, pepper and fry until it gets a color, then add the vegeta, parsley and bay leaf. Mix for a few minutes then add packed tomato and water to be at the height of the finger-two over the meat. Cook about 40 minutes to an hour and then add a large spoon of chopped bread crust and cook for another 10 to 15 minutes.', 'Crni luk i beli luk narezati na sitno ili kao ja staviti u seckalicu da se dobro usitne pa popržiti na malo ulja. Dok se prži luk ukoliko je potrebno podlivati sa vodom da ne zagori. Kad je luk gotov, dodati meso, so, biber i pržiti dok ne dobije lepu boju, zatim dodati vegete, peršuna i lovorov list. Par minuta mešati pa dodati paradajz iz flaše i vodu da bude u visini prsta-dva preko mesa. Kuvati oko 40 minuta do sat vremena te na kraju dodati veliku kašiku hlebne mrvice pa kuvati još 10-15 minuta.', '2019-04-15 03:23:36'),
(10, 4, 3, 'Chocolate cake', 'Čokoladni kolač', 'Squeeze the sweet cream into the whipped cream, add the vanilla sugar powder, the juice and the orange crust, then pour the chocolate melted on vapor. Mix well with the electric mixer, and then pour the chopped chocolate. Pour the mix into a foil coated with a transparent foil and leave in the freezer for three hours. Turn the cooled cake into the tray and pour it over with the chocolate glaze that you have prepared so that you have, in chocolate, mixed softened butter which you have melted on vapor.', 'Slatku pavlaku istucite u šlag, umešajte vanilin šećer u prahu, sok i narandžinu koricu pa čokoladu otopljenu na pari. Dobro izmešajte električnom mešalicom, pa umešajte zdrobljenu čokoladu. Smesu izlijte u kalup obložen prozirnom folijom i ostavite u zamrzivaču tri sata. Ohlađeni kolač okrenite na poslužavnik, pa ga prelijte čokoladnom glazurom koju ste pripremili tako da ste u čokoladu, koju ste otopili na pari, umešali omekšani maslac.', '2019-04-13 16:41:28'),
(11, 4, 4, 'Blueberry pie', 'Pita od borovnica', 'Mix flour with baking powder, add butter sliced on leaflets, salt and sugar. Crumble everything with your fingers together and add cold water. Bake dough and let it stand in the cold place for at least 30 minutes. Wash the blueberries and decant well. Part of prepared dough stretch out out slightly more than the size of the mold and place it in a slotted and flattened mold with a diameter of 24 cm. With dough, cover the bottom and mold sides. Sprinkle the crumbs and arrange the marinated blueberries. Sprinkle everything with cinnamon, powdered sugar, vanilla sugar and nuts. Spread the remaining dough and cover it with blueberries. Cover the surface of the dough with yolk, stab with a fork and bake in the oven heated to 180 ° C for 35-40 minutes.', 'Brašno pomešajte s praškom za pecivo, dodajte maslac narezan na listiće, so i šećer. Sve zajedno izmrvite prstima i na kraju dodajte hladnu vodu. Umesite glatko testo i ostavite ga da stoji na hladnom mestu najmanje 30 minuta. Borovnice operite i dobro ocedite. Deo pripremljenog testa razvucite malo više od veličine kalupa i stavite u namazan i pobrašnjen kalup prečnika 24 cm. Testom prekrijte dno i stranice kalupa. Po testu pospite hlebne mrvice i rasporedite oceđene borovnice. Sve pospite cimetom, šećerom u prahu, vanilin šećerom i orasima. Preostalo testo razvucite i njime pokrijte borovnice. Površinu testa premažite razmućenim žumancem, izbodite viljuškom i pecite u pećnici zagrejanoj na 180°C 35-40 minuta.', '2019-04-14 23:42:43'),
(12, 4, 4, 'Muhallebi', 'Muhallebi', 'Melt the butter at moderate temperature, and add the grits. Cook for a minute - two. Then, with constant stirring, pour the milk. Add sugar and vanilla sugar, then cook; until the mixture thickens. Then, add the coconut flour and cook the mixture for another 3-4 minutes. Pour the finished dessert into the glass jars and leave to cool! If you wish, decorate with coconut flour, cinnamon, nuts ...', 'Na umerenoj temperaturi otopiti puter, pa dodati griz. Pržiti minut - dva. Zatim, uz neprestano mešanje, sipati mleko. Dodati i šećer i vanilin šećer, pa kuvati; da se mešavina zgusne. Zatim, dodati kokosovo brašno i kuvati mešavinu još 3-4 minuta. Sipati gotov dezert u staklene posude i ostaviti da se ohladi! Po želji dekorisati kokosovim brašnom, cimetom, orasima...', '2019-04-10 15:26:31'),
(13, 4, 2, 'Blinis with honey', 'Blinis sa medom', 'Heat the milk in a low heat and then pour half (250 ml) into the bowl and add the milled yeast - mix until it is mixed. Then add 150 gr of flour and it mix well. Cover with a cloth and leave at room temperature until the volume is doubled or tripled! About an hour. Add eggs, butter and sweet cream to the hot dough - stir well to combine this first. Then add the rest of milk, flour and finally sugar. Mix well and then cover it with a cloth and let it rise again (30 min.) Lubricate the pan with oil and heat it well - blast bake on a strong fire! I lubricated the tin to every tenth pancake - and it did not glue ... Blank should be baked from both sides to brown. As you bake they will grow. Put a little of butter on each. Pour honey.', 'Mleko ugrejati na tihoj vatri pa polovinu (250 ml ) sipati u činiju i dodati izmrvljen kvasac  - mešati dok se ne sjedini. Zatim dodati 150 gr brašna pa i to dobro sjediniti. Pokriti krpom i ostaviti na sobnoj temperaturi dok se volumen ne udvostruči ili utrostruči ! Oko sat vremena . Naraslom testu dodajte jaja , maslac i slatku pavlaku - dobro promešajte da se prvo ovo sjedini. Zatim dodajte ostatak mleka, brašna i na kraju i šećer. Dobro sjedinite pa opet prekrijte krpom i ostavite da ponovo naraste ( 30 min ) Tiganj podmažite uljem i dobro ugrejte - blini se peku na jakoj vatri ! Ja sam podmazivala tiganj na svaku desetu palačinkicu - a nije se lepilo.. Blini se peku sa obe strane do smeđe boje. Dok pečete oni će rasti . Na svaki stavite po malo maslaca. Prelijte medom.', '2019-04-19 19:47:39');

-- --------------------------------------------------------

--
-- Table structure for table `post_pictures`
--

CREATE TABLE `post_pictures` (
  `ID_post` int(11) NOT NULL,
  `ID_picture` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `post_pictures`
--

INSERT INTO `post_pictures` (`ID_post`, `ID_picture`) VALUES
(1, 1),
(1, 2),
(1, 3),
(2, 4),
(2, 5),
(2, 6),
(3, 7),
(3, 8),
(4, 9),
(4, 10),
(4, 11),
(5, 12),
(5, 13),
(6, 14),
(6, 15),
(7, 16),
(7, 17),
(7, 18),
(8, 19),
(8, 20),
(9, 21),
(9, 22),
(10, 23),
(11, 24),
(11, 25),
(11, 26),
(12, 27),
(12, 28),
(13, 29);

-- --------------------------------------------------------

--
-- Table structure for table `post_tag`
--

CREATE TABLE `post_tag` (
  `ID_post` int(11) NOT NULL,
  `ID_tag` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `post_tag`
--

INSERT INTO `post_tag` (`ID_post`, `ID_tag`) VALUES
(1, 1),
(1, 4),
(1, 7),
(1, 8),
(2, 3),
(3, 1),
(3, 5),
(3, 9),
(4, 3),
(5, 3),
(5, 4),
(5, 6),
(5, 7),
(6, 2),
(6, 5),
(7, 2),
(7, 5),
(7, 6),
(7, 7),
(7, 8),
(8, 3),
(8, 6),
(9, 3),
(9, 5),
(9, 7),
(9, 8),
(10, 3),
(10, 7),
(11, 2),
(11, 6),
(12, 1),
(12, 4),
(13, 2),
(13, 5);

-- --------------------------------------------------------

--
-- Table structure for table `tags`
--

CREATE TABLE `tags` (
  `ID` int(11) NOT NULL,
  `name` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `SRBname` varchar(20) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tags`
--

INSERT INTO `tags` (`ID`, `name`, `SRBname`) VALUES
(1, 'Easy', 'Lako'),
(2, 'Hard', 'Teško'),
(3, 'Medium', 'Srednje težine'),
(4, 'Fast', 'Brzo'),
(5, 'Slow', 'Sporo'),
(6, 'Recommendation', 'Preporuka'),
(7, 'Favourite', 'Omiljeno'),
(8, 'Domestic', 'Domaće'),
(9, 'Vegan', 'Vegansko');

-- --------------------------------------------------------

--
-- Table structure for table `types`
--

CREATE TABLE `types` (
  `ID` int(11) NOT NULL,
  `text` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `SRBtext` varchar(30) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `types`
--

INSERT INTO `types` (`ID`, `text`, `SRBtext`) VALUES
(2, 'Appetizer', 'Predjelo'),
(3, 'Main Course', 'Glavno Jelo'),
(4, 'Dessert', 'Dezert');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `ID` int(11) NOT NULL,
  `email` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `rights_id` int(11) NOT NULL,
  `name` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `last_name` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `LastTimeSeen` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`ID`, `email`, `password`, `rights_id`, `name`, `last_name`, `LastTimeSeen`) VALUES
(1, 'nikola.nini@gmail.com', 'dde97b0f416347ba3dc5e267df7ae730', 1, 'Nikola', 'Nedeljkovic', '2019-06-11 20:27:07'),
(2, 'nedeljkovic.nikola.ks@gmail.com', '6c85074bbab72ae974038a427c4fc276', 2, 'Drugi', 'User', '2019-06-10 21:40:49'),
(3, 'neki.tamo@gmail.com', 'afc273868c8ad212d7faf013a96f9c41', 2, 'Nesto', 'Tamo', '2019-06-10 21:40:49'),
(4, 'fantasticna.kuvarka@kuvar.com', '40d2a5682b4f77afc128497848a04043', 2, 'Fantasticna', 'Kuvarka', '2019-06-10 21:40:49'),
(5, 'marko.markovic@gmail.com', 'fd0120c8c1e8a316a8a35018ec8a1ce2', 2, 'Marko', 'Markovic', '2019-06-10 21:40:49'),
(6, 'ja@ja.ja', '655faa8ba799a3a1ae309c2b40d142fc', 2, 'Ja', 'Ja', '2019-06-10 21:55:32'),
(7, 'marko@marko.marko', '4dacbbf8c6ad88182d6271c0fc910d00', 2, 'Marko', 'Marko', '2019-06-10 21:40:49'),
(8, 'marko2@marko.marko', '8fddbb9ad8a50cf46e254999c51ee869', 2, 'Markodva', 'Markodva', '2019-06-10 21:40:49'),
(9, 'neko@neko.neko', 'f25b29b31e9289f03fcc430d9e832dff', 2, 'Neko', 'Neko', '2019-06-10 21:40:49'),
(17, 'aluminijum@marinija.com', 'd7517beeb7e16aaab794314dbf7a186d', 2, 'Ajkula', 'Drakula', '2019-06-10 21:40:49');

-- --------------------------------------------------------

--
-- Table structure for table `user_rights`
--

CREATE TABLE `user_rights` (
  `ID` int(11) NOT NULL,
  `right_name` varchar(20) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user_rights`
--

INSERT INTO `user_rights` (`ID`, `right_name`) VALUES
(1, 'Admin'),
(2, 'User');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `post_id` (`post_id`);

--
-- Indexes for table `food_quotes`
--
ALTER TABLE `food_quotes`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `navigation`
--
ALTER TABLE `navigation`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `newsletter_subscribers`
--
ALTER TABLE `newsletter_subscribers`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `pictures`
--
ALTER TABLE `pictures`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `post`
--
ALTER TABLE `post`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `type_id` (`type_id`);

--
-- Indexes for table `post_pictures`
--
ALTER TABLE `post_pictures`
  ADD PRIMARY KEY (`ID_post`,`ID_picture`),
  ADD KEY `post_pictures_ibfk_2` (`ID_picture`);

--
-- Indexes for table `post_tag`
--
ALTER TABLE `post_tag`
  ADD PRIMARY KEY (`ID_post`,`ID_tag`),
  ADD KEY `post_tag_ibfk_2` (`ID_tag`);

--
-- Indexes for table `tags`
--
ALTER TABLE `tags`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `types`
--
ALTER TABLE `types`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `rights_id` (`rights_id`);

--
-- Indexes for table `user_rights`
--
ALTER TABLE `user_rights`
  ADD PRIMARY KEY (`ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `food_quotes`
--
ALTER TABLE `food_quotes`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `navigation`
--
ALTER TABLE `navigation`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `newsletter_subscribers`
--
ALTER TABLE `newsletter_subscribers`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `pictures`
--
ALTER TABLE `pictures`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `post`
--
ALTER TABLE `post`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `tags`
--
ALTER TABLE `tags`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `types`
--
ALTER TABLE `types`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `user_rights`
--
ALTER TABLE `user_rights`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`post_id`) REFERENCES `post` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `post`
--
ALTER TABLE `post`
  ADD CONSTRAINT `post_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `post_ibfk_2` FOREIGN KEY (`type_id`) REFERENCES `types` (`ID`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `post_pictures`
--
ALTER TABLE `post_pictures`
  ADD CONSTRAINT `post_pictures_ibfk_1` FOREIGN KEY (`ID_post`) REFERENCES `post` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `post_pictures_ibfk_2` FOREIGN KEY (`ID_picture`) REFERENCES `pictures` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `post_tag`
--
ALTER TABLE `post_tag`
  ADD CONSTRAINT `post_tag_ibfk_1` FOREIGN KEY (`ID_post`) REFERENCES `post` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `post_tag_ibfk_2` FOREIGN KEY (`ID_tag`) REFERENCES `tags` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`rights_id`) REFERENCES `user_rights` (`ID`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
