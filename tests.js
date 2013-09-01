var assert = require('assert');

var LCS = require('./lcs.js');

suite('Simple cases for correct length of LCS', function () {
  function t(a, b, r) {
    var lcs = LCS.StringLCS(a, b);
    if (r === -1)
      r = lcs.length;

    assert.equal(lcs.length, r, 'The length is not equal to expected');
    assert(isSubsequence(lcs, a), 'Not subsequence of a:\n' + lcs + '\n' + a);
    assert(isSubsequence(lcs, b), 'Not subsequence of b:\n' + lcs + '\n' + b);
  };
  test('Manual minimal', function () {
    t('a', 'zz', 0);
    t('dcbc', 'cd', 1);
    t('ddd', 'dd', 2);
    t('c', 'dccc', 1);
    t('cbd', 'dccc', 1);
  });
  test('Manual tests', function () {
    t('abcabba', 'cbabac', 4);
    t('qqq123ag', 'zqoagq2a', 4);
    t('zzzz', 'aaaaaaaa', 0);
    t('a', 'b', 0);
    t('aa', 'b', 0);
  });
  test('Generated minimal', function () {
    var alphabet = "abcd";
    for (var i = 0; i < 10000; i++) {
      var A = "", B = "";
      var n = Math.floor(Math.random() * 3) + 2;
      for (var j = 0; j < n; j++)
        A += alphabet[Math.floor(Math.random() * 4)];
      var n = Math.floor(Math.random() * 2) + 2;
      for (var j = 0; j < n; j++)
        B += alphabet[Math.floor(Math.random() * 4)];
      t(A, B, -1);
    }
  });
  return;
  test('From UVA forums', function () {
    // http://online-judge.uva.es/board/viewtopic.php?f=23&t=8864&start=90
    // lots of generated small tests, I was lazy to generate ones on my own
    t ('pgddggnujxqetuchfwhidygnsyksszhhhkmntbhczaiswkzbiikmisbasnuloduyqhllkvpjxxdtjeurogfwzjz', 'wtenzblrkycutrgsollzsiqgowdphcjdxpsysdpcctzvkfqasbzkjstaqyrxcaabsvakyrpaloyvvoy', 23);
    t ('rzadrtdhtuevxhwrcwbaoqdzgdwbrupkurnlkqvdnzamg', 'dktgljzqkftgjmdywxpkkbcfgphgdneiyzpliqdsxwbgkeggbxsnavtimaqspvapupcdhhxffynpcuyfrq', 16);
    t ('snoaaqruhouzimdntllaqlogqievbwq', 'kgymyrgifahnmmdixoiobwwrg', 8);
    t ('piyfdiobwoscwzffntsqbrgkfhgdbnfqxevaolelcypaywgnqafrtndbumevbknyojyewerydjzdfhqxjxrckudggieh', 'rhkciozmgzrpauwjmusjlxtfcaomgxgxfqanhbbnctednaoauhlfgfnkhdxpcfmhyowfryuuryzgynivwu', 27);
    t ('ebppkuozxt', 'gtcfytdspwqoerenmajofmgwwckxzdkixonxisszqkqubujpwsgdemzcojbqpmaoapnkh', 5);
    t ('kxqattwdjsxpwedxgtjijawlowadjhjtgzvasrfdlcujgxhprszasxoivolewuzevugqnltzqoiyn', 'pejqhdnvljjxnhtnmpjuhxicwyqgweaoklerpsmcbybqfvftm', 17);
    t ('ovowxmwqsuwuiggnaxhmzkmdauainmzdjnbgzzwtusocbwrbvypwkczlwzvlnurwjsfkubdowtszrmamk', 'jvvkirkffzbwykqdukgzyevtdmffbrxmoswymidrkepiqflkstmsyhlbvsjwkiiachzorch', 20);
    t ('jylzgwmyqyqqfetawczikjj', 'qkdkmnnxlzxrxlppjifqmzs', 4);
    t ('drvodgdvqifcvtchubytmqjxyqnm', 'hyvbtlebozrwfwuaybwzbplrakrrxfiggfhbqldglufsqzsoaqpdfaxgmozjwjscpzfflioydtqvskmuabxfe', 11);
    t ('nqlmcjwulltqsgbgegbubvenpgppmvlbly', 'nhmhuzdntjocoudk', 5);
    t ('zrlqxcflztnkrdazrjvsmilywpostyqupdknhsygnnsequfje', 'bslpskegczfutwzgjiykonxjrqdzz', 11);
    t ('cdcnsuzybeyiyteazqizazmxigplhpvjuzymvymyekicgnefdnffmtewbuhijerffsrdsfbwqkawzfdeskj', 'encfhlqsshxxbqat', 9);
    t ('eroqsmpzpttcczirdpzoftiptgqjimhodvexjtwzopbqqjktajkg', 'svxyljjzqxdoccxxzymobefmoanzktgdoddbmmbfmgtqiqnjpbaqihdwhqyslexzhaawndbblwrumgfdkfwsmbqw', 20);
    t ('oqcsndcnfacjdduzwqndytpdphsqxqjogngtqkgxklipo', 'onvcsvvhzmqtcnjndpakkswsrjdayufphctbyoizcysgndtruvdepbygkcgjylahotiojqnlqfrdkmwejziybgglkpwicwrsp', 24);
    t ('gartlhaelkqjozjyzmfgzrvwczutsmtymksause', 'dxqtwzsylzglqdjscfoutjt', 9);
    t ('vnkpfowklnekowiavqnntyivfwqzfl', 'aytqfhoqvbwhqspspffeafmvkknlrausynkexawucsbumsmbzthzauwkgmwymqsngctfcpbghcctuowvjdujzswggsetkwisa', 15);
    t ('zeq', 'nxcpsygotrtpbtkzbqrhldfvwfwvlmwylaqfbwtwnpoqkyplqisemxzkewfpkdqyegdh', 3);
    t ('zdrorkarzlkkfowcngilnzwtpwzxzgbajv', 'dfqugbesiuokiwutmurfjnejpkkrvhiymyvvcbnkwexgcrzonttxizizjsrfazfozaldczqafpghghwuartlrbkc', 15);
    t ('dhxepoepzjtaztfobpxjntleowxrjaomjmryaxqbgjcifjygyxrlqdqgbpxkpmxzaqzanpbvbfdipcqnbizslramgyzymwzoo', 'qbqrytzcbogrdhzcbmvcbecaeqyd', 14);
    t ('mdupvnnqorrczlgjmkkzioamscskavqmambyaoooiithvbqhldivtkhmmbym', 'pyzb', 3);
    t ('zdspuaznjuqacbdkxwvgkjijwgawhbyihqabszqbugdwhgigffprpzcnhcjrgjbnbbqtbgxvmatvj', 'eqlvhcwmpdqawymylnzdjcjizvisttyxjjutn', 13);
    t ('fevvesusshgtlrwwzvuhqnbqmmbgfoymstkyngrhpzbcqzzpwtyoibeuohcvvaipvsqjyjqnitqasrppmpfurm', 'htscrumipeyaehrurkmrfdiwpybjrnbyjvcappigvjhcsawkkibrnmnckpnbeqbn', 20);
    t ('fncuyishrubrsleapvpbjrnagqewruhyhjvhtnqljscbfidwesxpjmprcvn', 'pwuzhpgccznntsoyarvgjuvujmlliahxydyfshjwgxjzrzztqwaztxtckgnuiwtgzsntzwrhvaimzhirgkszhnbttqpbpjh', 20);
    t ('dwketb', 'qetffcnxixpjg', 2);
    t ('mcwfraucjkh', 'wlbyyteryjwlggkystbevz', 4);
    t ('obftlqatoowmmpqgocebikmgchjjejuskanxsqsgeovsgnywpcxaplitsscwdzrpbgntwhbcyyveotafyzfnlogfilelkvcnbpi', 'zjcxkxbytddrcl', 9);
    t ('pbmvjzzwlwyyzqgzpsemcdpcwshpusvkvkhelgcxebxdtefiylucolendnexicjdoqizymyenwkgcrqc', 'mesxkhaxoafqljeetfefgjvcvdgmuiqimkgyuivikbawmgahlgorpjvmpdyllqtzdbxxkvfwyfsklutybhssrpfitftgwm', 21);
    t ('zqfy', 'ad', 0);
    t ('akrkxlfxonphef', 'oathgrvosluqnwvmxfdjeqpchetokacyaxfhpavhmrabqvnpdsahlrlsvhifhkdijiryloizgiaydonginqtfdnckv', 9);
    t ('shlcrwvphjzirh', 'pnycvhslczpqbbnltvxxmvudeefmvmunbtrxcliekzwobkzwhywvvqazuflsuihvdysfkdlwckmdwmcdmy', 9);
    t ('ioyhlevdydmvikopwrattmhzitblgblopmxassfsxrnhebwauzvqldpwysjgtxwkjulbostokivqmu', 'gtowgtnerhoyalulwqyxhqsvccssoolxjztqsj', 15);
    t ('lqkltxggtyesfwmc', 'pvtfjectfylzhjlxuwqtewpdcjkbwncnkvuvcxqhvbhclubhsucxsrcvbmwzbaolvihxhxhcbqg', 8);
    t ('kkxcezbwtftwurvvrlhpvqmdpvfqloexydcedfawlwsfppchclwxbkariijtwqtwtvayacunaosqfvxjgv', 'khjdprmlpeelyznwbstpsjhipehynehzmrcdkqoavuntvdrxvkmpwvylchlrmvqamsfyiwydq', 24);
    t ('ymrqjocxdaudnwlznxwfzkxeigajltxkfqcqggpjhjnuiyvxxtdydccmkfxwauifmmxsso', 'bxqyhqvhprmnuosizzfxzbfgprdhlrlpqdpaumhjdvzylrimsojrrqxhjcqvvbmlhbndpwmtrntdgbpyrbpjros', 20);
    t ('qiynmkztnmwclkxcaqhguzflawwtloudxurlgsetgcyroxwoodvkcaveysylgupfpiqvcwriypcnoybedwoiykmzc', 'kkhbswjirnfi', 9);
    t ('fzauoawsduhlvtauxmejtgbprkjhrtfytftjhrdklmyifycckjmgrpxkbgrsawtvdmemdhxquxzbxbejmspdhn', 'jtfdveyqjkwwpgviashdpkjyxbqcldqwyyzwcymnkjjcrekryrwpdgqchgfu', 23);
    t ('vqjtsfxsuncfwgwdqpd', 'ltprjrzpwvaumlnernwlaaqyhmdzbhlmaaglrfcoceiopxsgmqt', 7);
    t ('tlnczqdaxopzovmgcowgsgvifpqsimgbxvdxmizlxqnlnztrqrykztufklzsxhtwdytrhveglrrbtn', 'lgsvgnqlydmqatmywkuptpuzcltdggyroqnugdhe', 20);
    t ('tu', 'pgintcdorxowkhbrpb', 1);
    t ('duxaachekbauqhdfcfiqzfgvsnyleavkuv', 'uxtykwyeohjujpccqkilcyjpelkoffazfuxpsythhdbtudvkpfxtdiikutazabzfxyupyqygtz', 15);
    t ('pfuzubyofgwpcrpcssdxrdujckhkfhjumfvigtwnbvceouiiolggqcp', 'myerfnntsicbdaoevtkmnsudfcjweaqqzvjgkwcfgegjewqcpcqexkicntarwrkxotdasffallksicuzgmed', 18);
    t ('oglhgfdzpcpkgqenvfzjrrtvnubzyfxoljwtobvfemrmcwzabals', 'gpiaqjzvhpisleipznvlejqaisdldxejmpjdykahajz', 12);
    t ('nheowzbbirdtjjgogmxvb', 'yatyjvjjjwsnmpposzhxurgafpnfkqoishicdsnoqfdfwstquaootwrblegvwuf', 9);
    t ('dorgigualafku', 'aodqdwnwzyafuybznfpglzmicakjmekm', 5);
    t ('nfylsulqwsmuuokzfqmhfwjhgstlehgtmehgauxwmlsgbchhtuqaszhztamajstwyccywbujpmrqpzzkvpmnqtokvcmeufcskfq', 'imrxbjqskrchhqwzjnlgpxkmfpepuxxelpemawemnitwypwjehpufcgkrmbnlytznx', 25);
    t ('ntszjcufdmboqlekqiscbfdosbhrphfecxglbcteoutfhzrzjkbkrea', 'ijdzqifvfngiqbpewilfjff', 11);
    t ('pgeinetxnwwgebblpjuhljnjtz', 'eetyvccdrgwovvkbzncneohlzszknyyr', 8);
    t ('upbytepzcdwznyzccmhqvsrnrdcrctxykywdenej', 'aifyjhdxovshphasjuwetuousryf', 6);
    t ('jvwuawdkbbyxvhmdkeogbtzxhtszuzwfvuzxtdjugitbrhgbovhrojoxeiwai', 'gfrhekmohsyawpkctyxcpnlflsojsyeadyihiuxrp', 12);
    t ('unlepecpgtcuypmozgmfjpdrzonwfeuzrfdjlhytacnzsbpricyrtckusztxenz', 'ucgfkeykj', 7);
    t ('lbpbuzfssywe', 'qeookbnhvrqcdwcqfsbgiecjjxekvidmmrayupgrgwtmsxcaqdiaklj', 5);
    t ('inddyipkbrjvirmrphdjffjxksxufiqnytswekifbtdkkrdbbgnilwfxqcs', 'kikidfghppp', 6);
    t ('iscvlhwmnjuaizyydswoaiydnhncwcvewzzhhyuwhoxpqxqtpojpykumrjqnlnth', 'tpwtluazrspoklfauuyerkvadkoqexfzmdszyuzroqiydnyykzedladomthqrmrfslfqggjuy', 21);
    t ('vcfvarueuggzwvtdlmqfrkqycyeltddqfklhbgnvowukrpocbgjvqatsyadtdijksvrvdgqrcnbtcrygxhbnjwhkwndzvpl', 'melpleinrl', 8);
    t ('vdfdcoeqydzizmnbicmyorlfepn', 'ibaeefjiwqyutac', 4);
    t ('mrvwukuidiqhxfyggbmmivvelvygvczkuwgqgdajlqqkwrqesetacohplfwjkx', 'gtzwaewjpncaltspnxipbywqmemvqjowfpsfuqqldulqpeicdsugrqwfwlamwqi', 15);
    t ('fcibtbnyvyrlezpjr', 'pkcopyzpnxfxznajovmbvicmvilmsfwjpazfaywnyelzrnihivlffpscx', 8);
    t ('orkkdamchndfabjnacakmifxommiolndfapiack', 'rporqyf', 3);
    t ('cfdoqklgxzqlndqsdgcfkoobefuwfzrhhuyzglhdnxracjugpwnbmecqjxpqygxhcxiijpowohyrqs', 'iqmlcqovznkpnspvumfexxstlbrculbebopgefbgsnvifmfbbkfyhautbnxxzzbcpritwlzraxzflggmqonaohvrusp', 24);
    t ('tqyijieiwfzweac', 'ikeaaraqavixqzslrswbbajxhktmmxewkkwkexbeulbmkwybouepwpofbktphxltiiemhhsdswqcsq', 8);
    t ('gkkyibopdyjsigebqohexozagvqkpgqvscvcdmsgkbbujhwcvdgsuhsacllrtdpofmqiykrjlsfxzbzwhhobpidtvonptcfyo', 'jpicavufsvhtrqdhturwnnncegejhvgqmosmkorejayaqdhjxygmntprbvcisjyezsqlgkqpkqrbtymszuempvg', 25);
    t ('tizltasvukgduwsfomihmwblrgagdizwqbimbchxmpahovochwmtunhlvjuzrtvjwfxzhgxwwxdksro', 'paxlqgxlptmimktlprkzxhvvfahztwbkyavogscxlqfaaalsrvtrfoomqwljuotsqojwjnvwdcyedlywjrpofecxcngwe', 27);
    t ('ourztcmozqrzwunuqylio', 'mqpodxkjya', 3);
    t ('pazsonteeucahytfjbtdpjudprpappghrfzgvumborcwpvdbyzenkzsbshckykrsssanmmoadsyv', 'ewndccpdurwdvgcfxwxpwmbkbdqteljihynjbcpvtlbordwqb', 17);
    t ('hxikhlnzerkpbtoofrruokfpbyuzovuvuehepudwoonphdeouvilhnaknxldsia', 'mhtecwasmphutnipitasidewaqzuyajkjcqnzsflinhdasslnvfvyjryztsxvekeg', 16);
    t ('shtzvbmeepyyclthjtqcrsvmpssbzyctivsf', 'hleykcaxyjgrzjltgzlzrmarotbllglssrqewsdubkndvywbxhcqucikxjyjsjdmbwqxottsfgvchrgg', 16);
    t ('kxvnhfkqfvkrbwuxotnkmfruaubuaivkhszozmgfjrwknqjcjxmxcdrfz', 'bbdwmkonypbgulxqxlihpredoiigpibqjgoxqenquowobwhbhpiyjobxyjfqtiido', 16);
    t ('cgdpyzgxqjtxkcouaxkdxjocbinjnbgpimhilnfbyayjcpfeo', 'hlbwqcgdlteukogt', 8);
    t ('rievhfvsjkxozpxkqvcsbfgwmahcicbzlgwsnsmycjodzmqphskjyqhksqmatobewyylqkl', 'vayumomvgyggooqiefixvldtjdgbnrwjtuffkrdqrjxfxppewzdrljmwmsycmunfqsnamqsdzplzhcfd', 21);
    t ('kxptjlielkqfzvxrixfaqlchydqaiuesttochwgsgyafuxyexgfpthyrkptulaoetcicyrvgpxnlwmqtux', 'nglgsazmnz', 5);
    t ('rvfbxd', 'umitzvqlllhkwuqhaijcwydxpyesyjlsvvovqeiepqonmhwpphrmfulwvpptaanwxbtnfdtxvkkirhxgqquwmfsh', 4);
    t ('hazjovgrqwxtpwpbgzspybgoveadwibgkapaxysnurjlnanvzhlxitngxplvzmbmptmmreclxnyknnimvvlfoalnryktlmfcfr', 'yyslxfjkuzsiwntbdvpsnncgaq', 12);
    t ('cxetvengcvsmpreynttqwphoe', 'smxjzaifvekimmdeavxetmxofvfmljjdxhoyhzecfomrcsycnxiikhwpccb', 12);
    t ('nns', 'ujlbipfnftgjlenyevgocffghivwvqjpzvshmzwstcbgjpfnmndrsizbsvyolhfmeav', 3);
    t ('zrjutmbcdirqxujqcirxdrl', 'bscfsxwuqhqmwtozdirbcarhlkeqerjfjlkeljadsspomgqpojsqmjxxwdnauwhgktmxem', 10);
    t ('xeqnswdkmpccbocykhnmckviwouttivqolfhjlrvavabjebv', 'ojpyezwtvpodlgsylbkwufyphzznawzrgqrkqofldtrqblrnmblgikxqlyfovgfbxwnnmvasqrisczhqa', 18);
    t ('ylewdsuigppnsmlibydbqtvanzcuqepoptmslhbtysgteubhugkk', 'fmpfojxtyniuabfhebhwhacddjxjvhlbwaiklhdkumgupldtmlr', 12);
    t ('ntbrezcbineepopbvsnqgtmxgssvdjtseulktomcbqirfxucsjsachykzqfecywgtitowfqzxzseyohqxbtzirkj', 'rnlqmulwnzuusvttoyrchkaidbtwncffstvgnicchyyztruhrom', 21);
    t ('yojdpcbdggiyzfgoniqwiqycislbgzagnjjfnmkttsuuzaloldktuivedj', 'jihsysddfqnzjhtfgvswgwgaqrxwwgbfrlzpddslthmeohjwces', 16);
    t ('aajstgopprxicwxizrtsyfwomikom', 'xogigcrwripqqsnncogvhecfuopgedketsobufxonpefhtsliairgkyaaqggtskpnzqhgqxwfcbovwzdwjwdtvdtlm', 13);
    t ('gemvrnobtgyplctbypcdllaoevuziga', 'momgbajxghotkhukyy', 7);
    t ('kjpapkwqueqjrhvzkxihfryybhungsb', 'dsusfrizvaiojfnuexdjpdjsldgtxjlabhuiyeiwfsmqackezoqqrzjefrxeckhfubouiwqpoffohqviglzzmkgtdf', 15);
    t ('fshk', 'ky', 1);
    t ('swzhlenbnfyv', 'lwmygstjytoqcbenzkhyjrjpgmcllyywwkwdfsofldvqgzfhlmfxfomldrwqrwm', 6);
    t ('jlqodhvqkqgsrnzecfbhvqtyhroaqdnzqgptnklzcurvhqzjx', 'rttmtcdkctprufxjamvllzfeunxwywzppudlwjvaemrzr', 12);
    t ('ktdierhmxcbuazrzr', 'tuvrdqrickjvbvohdvyljxpkuplnqevlbrcejvoofzlhvc', 8);
    t ('yxolglcsfrfsjkquljyrutiibh', 'kewafvoqdbvxjmcdwmvszerrbmbjnkfxpdxwanmdphcawfdutzovffmgupshzzfqfemfsbljin', 10);
    t ('guocoprjvyxdsmxcnxjec', 'qjhruqcibkc', 3);
    t ('nsfgdceaizofbcekiixyshqmxuwzebrrvy', 'zbebldssewxqefpczwuouokvvnmojkoknslyxdrdzqtdviixfelbvxwqlkeww', 12);
    t ('gkmtkjxbmyrhepqooxszynwwfjgmfcenothzegcrgwaklsybpt', 'piyloitapwgdmzmlesoxykzlxslyjeaznykbiedyclbolparhqqhcruzjgztkzszzeaikf', 18);
    t ('mrjbeydxhvpqxglwqtxldwddvjffunlggwjkuojdjyuiehewadjfzmkxysesfqalomxjagom', 'iukrbjresxghhffzjzgbzrqlqbowpccayprzyj', 14);
    t ('simzrtgrcfzehrwujxigmmiolxgkxrsqzgrqzyjedjik', 'ghldptrcegndmzbduteakwaiggorqyvwfizxcqbgwqjirmnlftmqqoyyumpknmguuftwxueumqeecupinbydpy', 18);
    t ('lnsvagbwbiqzgmeazugdyasgowgrnhv', 'upuwwysxgiymxcowyxbxxtflroffvcerranpyfohqnvprklqhmpghwszkzghbmyumnmlvaulppahbnzkbqrkmljzkrindjjqw', 13);
    t ('dryxenmgwovvy', 'nrhccsboklbnunftiimihtywzukv', 5);
    t ('ktfcah', '', 0);
    t ('kvfyyuulanwkcgsvequzarrmlwqngxgsunqsilgkyeuckoxpeuqgnjvyhlmnkugekwzshfcilyk', 'pkovgectnxsvkgkvcqzopygyfkgsltqcfexllbeyyyvlggglyfzngimnsuifpyhuefhpimqhmnuttaeuhfhpnvdislnhlxere', 28);
    t ('hmzzvmmphipnezsloijrqbefkreojicsvbtsphiwrzlvyehnmsgevnjfgowpyajvd', 'otmyrdzdzyjinxavbxkmcrcaibaswgwmbkmsomxpmixzfzwiwhxayzbgcdabjznmjahzoeoaplbwkxhi', 21);
    t ('ejedmnippjboynaawzoboqsbroorvwzbfghrtpjkymzybbzy', 'nbqets', 4);
    t ('jgqheqikwpdrgobeaadcbeaerbuxwoxfwnmbfxnbossvhubhwglaklgeocdkraspqgsvdfzua', 'phnqqmzcojp', 5);
    t ('newtqpviflrxjwfiqfzfmpyebx', 'piwlychrsxmdeyubhqirjnqobhogknmbwkmumulhtxmxxgagyjxhyqyaxogkculyhyst', 10);
  });
});

var isSubsequence = function (subsequence, sequence) {
  var lastIndex = -1;
  for (var i = 0; i < subsequence.length; i++) {
    var e = subsequence[i];
    var index = sequence.indexOf(e, lastIndex + 1);
    if (index === -1)
      return false;
    lastIndex = index;
  }
  return true;
};

