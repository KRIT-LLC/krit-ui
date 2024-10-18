import type { Meta, StoryObj } from '@storybook/react';
import { Select } from '@/components/ui/select';

const meta = {
  title: 'Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  args: {
    children: 'Select',
    options: [
      {
        "label": "Не выбрано",
        "value": "-1"
      },
      {
        "label": "Андорра",
        "value": "1"
      },
      {
        "label": "ОАЭ",
        "value": "2"
      },
      {
        "label": "Афганистан",
        "value": "3"
      },
      {
        "label": "Антигуа/Барбуда",
        "value": "4"
      },
      {
        "label": "Ангилья",
        "value": "5"
      },
      {
        "label": "Албания",
        "value": "6"
      },
      {
        "label": "Армения",
        "value": "7"
      },
      {
        "label": "Ангола",
        "value": "8"
      },
      {
        "label": "Антарктика",
        "value": "9"
      },
      {
        "label": "Аргентина",
        "value": "10"
      },
      {
        "label": "Амер. Самоа",
        "value": "11"
      },
      {
        "label": "Австрия",
        "value": "12"
      },
      {
        "label": "Австралия",
        "value": "13"
      },
      {
        "label": "Аруба",
        "value": "14"
      },
      {
        "label": "Аландские о-ва",
        "value": "15"
      },
      {
        "label": "Азербайджан",
        "value": "16"
      },
      {
        "label": "Босния-Герц.",
        "value": "17"
      },
      {
        "label": "Барбадос",
        "value": "18"
      },
      {
        "label": "Бангладеш",
        "value": "19"
      },
      {
        "label": "Бельгия",
        "value": "20"
      },
      {
        "label": "Буркина-Фасо",
        "value": "21"
      },
      {
        "label": "Болгария",
        "value": "22"
      },
      {
        "label": "Бахрейн",
        "value": "23"
      },
      {
        "label": "Бурунди",
        "value": "24"
      },
      {
        "label": "Бенин",
        "value": "25"
      },
      {
        "label": "Сен-Бартелеми",
        "value": "26"
      },
      {
        "label": "Бермудcкие о-ва",
        "value": "27"
      },
      {
        "label": "Бруней",
        "value": "28"
      },
      {
        "label": "Боливия",
        "value": "29"
      },
      {
        "label": "Бонэйр, Саба",
        "value": "30"
      },
      {
        "label": "Бразилия",
        "value": "31"
      },
      {
        "label": "Багамcкие о-ва",
        "value": "32"
      },
      {
        "label": "Бутан",
        "value": "33"
      },
      {
        "label": "о. Буве",
        "value": "34"
      },
      {
        "label": "Ботсвана",
        "value": "35"
      },
      {
        "label": "Беларусь",
        "value": "36"
      },
      {
        "label": "Белиз",
        "value": "37"
      },
      {
        "label": "Канада",
        "value": "38"
      },
      {
        "label": "Кокосовые о-ва",
        "value": "39"
      },
      {
        "label": "Респ. Конго",
        "value": "40"
      },
      {
        "label": "ЦАР",
        "value": "41"
      },
      {
        "label": "Конго",
        "value": "42"
      },
      {
        "label": "Швейцария",
        "value": "43"
      },
      {
        "label": "Кот-д'Ивуар",
        "value": "44"
      },
      {
        "label": "О-ва Кука",
        "value": "45"
      },
      {
        "label": "Чили",
        "value": "46"
      },
      {
        "label": "Камерун",
        "value": "47"
      },
      {
        "label": "Китай",
        "value": "48"
      },
      {
        "label": "Колумбия",
        "value": "49"
      },
      {
        "label": "Коста-Рика",
        "value": "50"
      },
      {
        "label": "Куба",
        "value": "51"
      },
      {
        "label": "Кабо-Верде",
        "value": "52"
      },
      {
        "label": "Кюрасао",
        "value": "53"
      },
      {
        "label": "О. Рождества",
        "value": "54"
      },
      {
        "label": "Кипр",
        "value": "55"
      },
      {
        "label": "Чехия",
        "value": "56"
      },
      {
        "label": "Германия",
        "value": "57"
      },
      {
        "label": "Джибути",
        "value": "58"
      },
      {
        "label": "Дания",
        "value": "59"
      },
      {
        "label": "Доминика",
        "value": "60"
      },
      {
        "label": "Доминик. респ.",
        "value": "61"
      },
      {
        "label": "Алжир",
        "value": "62"
      },
      {
        "label": "Эквадор",
        "value": "63"
      },
      {
        "label": "Эстония",
        "value": "64"
      },
      {
        "label": "Египет",
        "value": "65"
      },
      {
        "label": "Западная Сахара",
        "value": "66"
      },
      {
        "label": "Эритрея",
        "value": "67"
      },
      {
        "label": "Испания",
        "value": "68"
      },
      {
        "label": "Эфиопия",
        "value": "69"
      },
      {
        "label": "Европ. Союз",
        "value": "70"
      },
      {
        "label": "Финляндия",
        "value": "71"
      },
      {
        "label": "Фиджи",
        "value": "72"
      },
      {
        "label": "Фолкленд. о-ва",
        "value": "73"
      },
      {
        "label": "Микронезия",
        "value": "74"
      },
      {
        "label": "Фареры",
        "value": "75"
      },
      {
        "label": "Франция",
        "value": "76"
      },
      {
        "label": "Габон",
        "value": "77"
      },
      {
        "label": "Соед. Королев.",
        "value": "78"
      },
      {
        "label": "Гренада",
        "value": "79"
      },
      {
        "label": "Грузия",
        "value": "80"
      },
      {
        "label": "Франц. Гайана",
        "value": "81"
      },
      {
        "label": "Гернси",
        "value": "82"
      },
      {
        "label": "Гана",
        "value": "83"
      },
      {
        "label": "Гибралтар",
        "value": "84"
      },
      {
        "label": "Гренландия",
        "value": "85"
      },
      {
        "label": "Гамбия",
        "value": "86"
      },
      {
        "label": "Гвинея",
        "value": "87"
      },
      {
        "label": "Гваделупа",
        "value": "88"
      },
      {
        "label": "Экват. Гвинея",
        "value": "89"
      },
      {
        "label": "Греция",
        "value": "90"
      },
      {
        "label": "Сэндвичевы о-ва",
        "value": "91"
      },
      {
        "label": "Гватемала",
        "value": "92"
      },
      {
        "label": "Гуам",
        "value": "93"
      },
      {
        "label": "Гвинея-Бисау",
        "value": "94"
      },
      {
        "label": "Гайана",
        "value": "95"
      },
      {
        "label": "Гонконг",
        "value": "96"
      },
      {
        "label": "Херд/Макдональд",
        "value": "97"
      },
      {
        "label": "Гондурас",
        "value": "98"
      },
      {
        "label": "Хорватия",
        "value": "99"
      },
      {
        "label": "Гаити",
        "value": "100"
      },
      {
        "label": "Венгрия",
        "value": "101"
      },
      {
        "label": "Индонезия",
        "value": "102"
      },
      {
        "label": "Ирландия",
        "value": "103"
      },
      {
        "label": "Израиль",
        "value": "104"
      },
      {
        "label": "Остров Мэн",
        "value": "105"
      },
      {
        "label": "Индия",
        "value": "106"
      },
      {
        "label": "БритТерр ИндОк",
        "value": "107"
      },
      {
        "label": "Ирак",
        "value": "108"
      },
      {
        "label": "Иран",
        "value": "109"
      },
      {
        "label": "Исландия",
        "value": "110"
      },
      {
        "label": "Италия",
        "value": "111"
      },
      {
        "label": "Джерси",
        "value": "112"
      },
      {
        "label": "Ямайка",
        "value": "113"
      },
      {
        "label": "Иордания",
        "value": "114"
      },
      {
        "label": "Япония",
        "value": "115"
      },
      {
        "label": "Кения",
        "value": "116"
      },
      {
        "label": "Киргизия",
        "value": "117"
      },
      {
        "label": "Камбоджа",
        "value": "118"
      },
      {
        "label": "Кирибати",
        "value": "119"
      },
      {
        "label": "Коморские о-ва",
        "value": "120"
      },
      {
        "label": "Ст-Китс и Невис",
        "value": "121"
      },
      {
        "label": "Северная Корея",
        "value": "122"
      },
      {
        "label": "Южная Корея",
        "value": "123"
      },
      {
        "label": "Кувейт",
        "value": "124"
      },
      {
        "label": "Каймановы о-ва",
        "value": "125"
      },
      {
        "label": "Казахстан",
        "value": "126"
      },
      {
        "label": "Лаос",
        "value": "127"
      },
      {
        "label": "Ливан",
        "value": "128"
      },
      {
        "label": "Сент-Люсия",
        "value": "129"
      },
      {
        "label": "Лихтенштейн",
        "value": "130"
      },
      {
        "label": "Шри-Ланка",
        "value": "131"
      },
      {
        "label": "Либерия",
        "value": "132"
      },
      {
        "label": "Лесото",
        "value": "133"
      },
      {
        "label": "Литва",
        "value": "134"
      },
      {
        "label": "Люксембург",
        "value": "135"
      },
      {
        "label": "Латвия",
        "value": "136"
      },
      {
        "label": "Ливия",
        "value": "137"
      },
      {
        "label": "Марокко",
        "value": "138"
      },
      {
        "label": "Монако",
        "value": "139"
      },
      {
        "label": "Молдавия",
        "value": "140"
      },
      {
        "label": "Черногория",
        "value": "141"
      },
      {
        "label": "Сен-Мартен",
        "value": "142"
      },
      {
        "label": "Мадагаскар",
        "value": "143"
      },
      {
        "label": "Маршалловы о-ва",
        "value": "144"
      },
      {
        "label": "Сев. Македония",
        "value": "145"
      },
      {
        "label": "Мали",
        "value": "146"
      },
      {
        "label": "Мьянма",
        "value": "147"
      },
      {
        "label": "Монголия",
        "value": "148"
      },
      {
        "label": "Макао",
        "value": "149"
      },
      {
        "label": "С.-Мариан. о-ва",
        "value": "150"
      },
      {
        "label": "Мартиника",
        "value": "151"
      },
      {
        "label": "Мавритания",
        "value": "152"
      },
      {
        "label": "Монтсеррат",
        "value": "153"
      },
      {
        "label": "Мальта",
        "value": "154"
      },
      {
        "label": "Маврикий",
        "value": "155"
      },
      {
        "label": "Мальдивск. о-ва",
        "value": "156"
      },
      {
        "label": "Малави",
        "value": "157"
      },
      {
        "label": "Мексика",
        "value": "158"
      },
      {
        "label": "Малайзия",
        "value": "159"
      },
      {
        "label": "Мозамбик",
        "value": "160"
      },
      {
        "label": "Намибия",
        "value": "161"
      },
      {
        "label": "Новая Каледония",
        "value": "162"
      },
      {
        "label": "Нигер",
        "value": "163"
      },
      {
        "label": "Остров Норфолк",
        "value": "164"
      },
      {
        "label": "Нигерия",
        "value": "165"
      },
      {
        "label": "Никарагуа",
        "value": "166"
      },
      {
        "label": "Нидерланды",
        "value": "167"
      },
      {
        "label": "Норвегия",
        "value": "168"
      },
      {
        "label": "Непал",
        "value": "169"
      },
      {
        "label": "Науру",
        "value": "170"
      },
      {
        "label": "НАТО",
        "value": "171"
      },
      {
        "label": "Ниуэ",
        "value": "172"
      },
      {
        "label": "Новая Зеландия",
        "value": "173"
      },
      {
        "label": "Оман",
        "value": "174"
      },
      {
        "label": "Оранжевый",
        "value": "175"
      },
      {
        "label": "Панама",
        "value": "176"
      },
      {
        "label": "Перу",
        "value": "177"
      },
      {
        "label": "Фр. Полинезия",
        "value": "178"
      },
      {
        "label": "Папуа-Н. Гвинея",
        "value": "179"
      },
      {
        "label": "Филиппины",
        "value": "180"
      },
      {
        "label": "Пакистан",
        "value": "181"
      },
      {
        "label": "Польша",
        "value": "182"
      },
      {
        "label": "С.-Пьер,Микелон",
        "value": "183"
      },
      {
        "label": "О-ва Питкэрн",
        "value": "184"
      },
      {
        "label": "Пуэрто-Рико",
        "value": "185"
      },
      {
        "label": "Палестина",
        "value": "186"
      },
      {
        "label": "Португалия",
        "value": "187"
      },
      {
        "label": "Палау",
        "value": "188"
      },
      {
        "label": "Парагвай",
        "value": "189"
      },
      {
        "label": "Катар",
        "value": "190"
      },
      {
        "label": "Реюньон",
        "value": "191"
      },
      {
        "label": "Румыния",
        "value": "192"
      },
      {
        "label": "Сербия",
        "value": "193"
      },
      {
        "label": "Россия",
        "value": "194"
      },
      {
        "label": "Руанда",
        "value": "195"
      },
      {
        "label": "Сауд. Аравия",
        "value": "196"
      },
      {
        "label": "Соломоновы о-ва",
        "value": "197"
      },
      {
        "label": "Сейшельск. о-ва",
        "value": "198"
      },
      {
        "label": "Судан",
        "value": "199"
      },
      {
        "label": "Швеция",
        "value": "200"
      },
      {
        "label": "Сингапур",
        "value": "201"
      },
      {
        "label": "О. Св. Елены",
        "value": "202"
      },
      {
        "label": "Словения",
        "value": "203"
      },
      {
        "label": "Шпицберген",
        "value": "204"
      },
      {
        "label": "Словакия",
        "value": "205"
      },
      {
        "label": "Сьерра-Леоне",
        "value": "206"
      },
      {
        "label": "Сан-Марино",
        "value": "207"
      },
      {
        "label": "Сенегал",
        "value": "208"
      },
      {
        "label": "Сомали",
        "value": "209"
      },
      {
        "label": "Суринам",
        "value": "210"
      },
      {
        "label": "Южный Судан",
        "value": "211"
      },
      {
        "label": "С.-Томе и Прин.",
        "value": "212"
      },
      {
        "label": "Сальвадор",
        "value": "213"
      },
      {
        "label": "Синт-Мартен",
        "value": "214"
      },
      {
        "label": "Сирия",
        "value": "215"
      },
      {
        "label": "Эсватини",
        "value": "216"
      },
      {
        "label": "Теркс, Кайкос",
        "value": "217"
      },
      {
        "label": "Чад",
        "value": "218"
      },
      {
        "label": "Франц. ЮжнТерр",
        "value": "219"
      },
      {
        "label": "Того",
        "value": "220"
      },
      {
        "label": "Таиланд",
        "value": "221"
      },
      {
        "label": "Таджикистан",
        "value": "222"
      },
      {
        "label": "Токелау",
        "value": "223"
      },
      {
        "label": "Восточный Тимор",
        "value": "224"
      },
      {
        "label": "Туркменистан",
        "value": "225"
      },
      {
        "label": "Тунис",
        "value": "226"
      },
      {
        "label": "Тонга",
        "value": "227"
      },
      {
        "label": "Турция",
        "value": "228"
      },
      {
        "label": "Тринидад,Тобаго",
        "value": "229"
      },
      {
        "label": "Тувалу",
        "value": "230"
      },
      {
        "label": "Тайвань",
        "value": "231"
      },
      {
        "label": "Танзания",
        "value": "232"
      },
      {
        "label": "Украина",
        "value": "233"
      },
      {
        "label": "Уганда",
        "value": "234"
      },
      {
        "label": "Внешние мал. о.",
        "value": "235"
      },
      {
        "label": "Объед. нации",
        "value": "236"
      },
      {
        "label": "США",
        "value": "237"
      },
      {
        "label": "Уругвай",
        "value": "238"
      },
      {
        "label": "Узбекистан",
        "value": "239"
      },
      {
        "label": "Ватикан",
        "value": "240"
      },
      {
        "label": "Сент-Винсент",
        "value": "241"
      },
      {
        "label": "Венесуэла",
        "value": "242"
      },
      {
        "label": "Брит.Виргинс.о.",
        "value": "243"
      },
      {
        "label": "Амер.Виргинс.о.",
        "value": "244"
      },
      {
        "label": "Вьетнам",
        "value": "245"
      },
      {
        "label": "Вануату",
        "value": "246"
      },
      {
        "label": "Уоллис, Футуна",
        "value": "247"
      },
      {
        "label": "Самоа",
        "value": "248"
      },
      {
        "label": "Йемен",
        "value": "249"
      },
      {
        "label": "Майотта",
        "value": "250"
      },
      {
        "label": "Южная Африка",
        "value": "251"
      },
      {
        "label": "Замбия",
        "value": "252"
      },
      {
        "label": "Зимбабве",
        "value": "253"
      }
    ],
  },
};
