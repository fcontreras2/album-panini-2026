import { Sticker, TeamSection } from '@/types'

// ─── INTRO STICKERS (9) ──────────────────────────────────────────────────────
export const introStickers: Sticker[] = [
  { id: '00',   code: '00',   name: 'Panini Logo',              teamCode: 'FWC', teamName: 'FIFA World Cup', number: 0, isFoil: true,  section: 'intro' },
  { id: 'FWC1', code: 'FWC1', name: 'Official Emblem',          teamCode: 'FWC', teamName: 'FIFA World Cup', number: 1, isFoil: true,  section: 'intro' },
  { id: 'FWC2', code: 'FWC2', name: 'Official Emblem',          teamCode: 'FWC', teamName: 'FIFA World Cup', number: 2, isFoil: true,  section: 'intro' },
  { id: 'FWC3', code: 'FWC3', name: 'Official Mascots',         teamCode: 'FWC', teamName: 'FIFA World Cup', number: 3, isFoil: true,  section: 'intro' },
  { id: 'FWC4', code: 'FWC4', name: 'Official Slogan',          teamCode: 'FWC', teamName: 'FIFA World Cup', number: 4, isFoil: true,  section: 'intro' },
  { id: 'FWC5', code: 'FWC5', name: 'Official Ball',            teamCode: 'FWC', teamName: 'FIFA World Cup', number: 5, isFoil: true,  section: 'intro' },
  { id: 'FWC6', code: 'FWC6', name: 'Canada – Host Countries',  teamCode: 'FWC', teamName: 'FIFA World Cup', number: 6, isFoil: true,  section: 'intro' },
  { id: 'FWC7', code: 'FWC7', name: 'Mexico – Host Countries',  teamCode: 'FWC', teamName: 'FIFA World Cup', number: 7, isFoil: true,  section: 'intro' },
  { id: 'FWC8', code: 'FWC8', name: 'USA – Host Countries',     teamCode: 'FWC', teamName: 'FIFA World Cup', number: 8, isFoil: true,  section: 'intro' },
]

// ─── HISTORY STICKERS (11) ───────────────────────────────────────────────────
export const historyStickers: Sticker[] = [
  { id: 'FWC9',  code: 'FWC9',  name: 'Italy 1934',       teamCode: 'FWC', teamName: 'World Cup History', number: 9,  isFoil: true, section: 'history' },
  { id: 'FWC10', code: 'FWC10', name: 'Uruguay 1950',      teamCode: 'FWC', teamName: 'World Cup History', number: 10, isFoil: true, section: 'history' },
  { id: 'FWC11', code: 'FWC11', name: 'West Germany 1954', teamCode: 'FWC', teamName: 'World Cup History', number: 11, isFoil: true, section: 'history' },
  { id: 'FWC12', code: 'FWC12', name: 'Brazil 1962',       teamCode: 'FWC', teamName: 'World Cup History', number: 12, isFoil: true, section: 'history' },
  { id: 'FWC13', code: 'FWC13', name: 'West Germany 1974', teamCode: 'FWC', teamName: 'World Cup History', number: 13, isFoil: true, section: 'history' },
  { id: 'FWC14', code: 'FWC14', name: 'Argentina 1986',    teamCode: 'FWC', teamName: 'World Cup History', number: 14, isFoil: true, section: 'history' },
  { id: 'FWC15', code: 'FWC15', name: 'Brazil 1994',       teamCode: 'FWC', teamName: 'World Cup History', number: 15, isFoil: true, section: 'history' },
  { id: 'FWC16', code: 'FWC16', name: 'Brazil 2002',       teamCode: 'FWC', teamName: 'World Cup History', number: 16, isFoil: true, section: 'history' },
  { id: 'FWC17', code: 'FWC17', name: 'Italy 2006',        teamCode: 'FWC', teamName: 'World Cup History', number: 17, isFoil: true, section: 'history' },
  { id: 'FWC18', code: 'FWC18', name: 'Germany 2014',      teamCode: 'FWC', teamName: 'World Cup History', number: 18, isFoil: true, section: 'history' },
  { id: 'FWC19', code: 'FWC19', name: 'Argentina 2022',    teamCode: 'FWC', teamName: 'World Cup History', number: 19, isFoil: true, section: 'history' },
]

// ─── TEAM DATA (48 teams × 20 stickers = 960) ────────────────────────────────
// Helper to build team stickers
function team(code: string, teamName: string, players: [string, boolean][]): Sticker[] {
  return players.map(([name, isFoil], i) => ({
    id: `${code}${i + 1}`,
    code: `${code}${i + 1}`,
    name,
    teamCode: code,
    teamName,
    number: i + 1,
    isFoil,
    section: 'team' as const,
  }))
}

// Album physical order
export const teamSections: TeamSection[] = [
  {
    code: 'MEX', name: 'Mexico', flag: '🇲🇽',
    stickers: team('MEX', 'Mexico', [
      ['Team Logo', true], ['Luis Malagón', false], ['Johan Vasquez', false], ['Jorge Sánchez', false],
      ['Cesar Montes', false], ['Jesus Gallardo', false], ['Israel Reyes', false], ['Diego Lainez', false],
      ['Carlos Rodriguez', false], ['Edson Alvarez', false], ['Orbelin Pineda', false], ['Marcel Ruiz', false],
      ['Team Photo', true], ['Érick Sánchez', false], ['Hirving Lozano', false], ['Santiago Giménez', false],
      ['Raúl Jiménez', false], ['Alexis Vega', false], ['Roberto Alvarado', false], ['Cesar Huerta', false],
    ]),
  },
  {
    code: 'RSA', name: 'South Africa', flag: '🇿🇦',
    stickers: team('RSA', 'South Africa', [
      ['Team Logo', true], ['Ronwen Williams', false], ['Sipho Chaine', false], ['Aubrey Modiba', false],
      ['Samukele Kabini', false], ['Mbekezeli Mbokazi', false], ['Khulumani Ndamane', false], ['Siyabonga Ngezana', false],
      ['Khuliso Mudau', false], ['Nkosinathi Sibisi', false], ['Teboho Mokoena', false], ['Thalente Mbatha', false],
      ['Team Photo', true], ['Bathasi Aubaas', false], ['Yaya Sithole', false], ['Sipho Mbule', false],
      ['Lyle Foster', false], ['Iqraam Rayners', false], ['Mohau Nkota', false], ['Oswin Appollis', false],
    ]),
  },
  {
    code: 'KOR', name: 'South Korea', flag: '🇰🇷',
    stickers: team('KOR', 'South Korea', [
      ['Team Logo', true], ['Hyeon-woo Jo', false], ['Seung-Gyu Kim', false], ['Min-jae Kim', false],
      ['Yu-min Cho', false], ['Young-woo Seol', false], ['Han-beom Lee', false], ['Tae-seok Lee', false],
      ['Myung-jae Lee', false], ['Jae-sung Lee', false], ['In-beom Hwang', false], ['Kang-in Lee', false],
      ['Team Photo', true], ['Seung-ho Paik', false], ['Jens Castrop', false], ['Dongg-yeong Lee', false],
      ['Gue-sung Cho', false], ['Heung-min Son', false], ['Hee-chan Hwang', false], ['Hyeon-Gyu Oh', false],
    ]),
  },
  {
    code: 'CZE', name: 'Czechia', flag: '🇨🇿',
    stickers: team('CZE', 'Czechia', [
      ['Team Logo', true], ['Matej Kovar', false], ['Jindrich Stanek', false], ['Ladislav Krejci', false],
      ['Vladimir Coufal', false], ['Jaroslav Zeleny', false], ['Tomas Holes', false], ['David Zima', false],
      ['Michal Sadilek', false], ['Lukas Provod', false], ['Lukas Cerv', false], ['Tomas Soucek', false],
      ['Team Photo', true], ['Pavel Sulc', false], ['Matej Vydra', false], ['Vasil Kusej', false],
      ['Tomas Chory', false], ['Vaclav Cerny', false], ['Adam Hlozek', false], ['Patrik Schick', false],
    ]),
  },
  {
    code: 'CAN', name: 'Canada', flag: '🇨🇦',
    stickers: team('CAN', 'Canada', [
      ['Team Logo', true], ['Dayne St.Clair', false], ['Alphonso Davies', false], ['Alistair Johnston', false],
      ['Samuel Adekugbe', false], ['Riche Larvea', false], ['Derek Cornelius', false], ['Moïse Bombito', false],
      ['Kamal Miller', false], ['Stephen Eustáquio', false], ['Ismaël Koné', false], ['Jonathan Osorio', false],
      ['Team Photo', true], ['Jacob Shaffelburg', false], ['Mathieu Choinière', false], ['Niko Sigur', false],
      ['Tajon Buchanan', false], ['Liam Millar', false], ['Cyle Larin', false], ['Jonathan David', false],
    ]),
  },
  {
    code: 'BIH', name: 'Bosnia and Herzegovina', flag: '🇧🇦',
    stickers: team('BIH', 'Bosnia and Herzegovina', [
      ['Team Logo', true], ['Nikola Vasilj', false], ['Amer Dedic', false], ['Sead Kolasinac', false],
      ['Tarik Muharemovic', false], ['Nihad Mujakic', false], ['Nikola Katic', false], ['Amir Hadziahmetovic', false],
      ['Benjamin Tahirovic', false], ['Armin Gigovic', false], ['Ivan Sunjic', false], ['Ivan Basic', false],
      ['Team Photo', true], ['Dzenis Burnic', false], ['Esmir Bajraktarevic', false], ['Amar Memic', false],
      ['Ermedin Demirovic', false], ['Edin Dzeko', false], ['Samed Bazdar', false], ['Haris Tabakovic', false],
    ]),
  },
  {
    code: 'QAT', name: 'Qatar', flag: '🇶🇦',
    stickers: team('QAT', 'Qatar', [
      ['Team Logo', true], ['Meshaal Barsham', false], ['Sultan Albrake', false], ['Lucas Mendes', false],
      ['Homam Ahmed', false], ['Boualem Khoukhi', false], ['Pedro Miguel', false], ['Tarek Salman', false],
      ['Mohamed Al-Mannai', false], ['Karim Boudiaf', false], ['Assim Madibo', false], ['Ahmed Fatehi', false],
      ['Team Photo', true], ['Mohammed Waad', false], ['Abdulaziz Hatem', false], ['Hassan Al-Haydos', false],
      ['Edmilson Junior', false], ['Akram Hassan Afif', false], ['Ahmed Al Ganehi', false], ['Almoez Ali', false],
    ]),
  },
  {
    code: 'SUI', name: 'Switzerland', flag: '🇨🇭',
    stickers: team('SUI', 'Switzerland', [
      ['Team Logo', true], ['Gregor Kobel', false], ['Yvon Mvogo', false], ['Manuel Akanji', false],
      ['Ricardo Rodriguez', false], ['Nico Elvedi', false], ['Aurèle Amenda', false], ['Silvan Widmer', false],
      ['Granit Xhaka', false], ['Denis Zakaria', false], ['Remo Freuler', false], ['Fabian Rieder', false],
      ['Team Photo', true], ['Ardon Jashari', false], ['Johan Manzambi', false], ['Michel Aebischer', false],
      ['Breel Embolo', false], ['Ruben Vargas', false], ['Dan Ndoye', false], ['Zeki Amdouni', false],
    ]),
  },
  {
    code: 'BRA', name: 'Brazil', flag: '🇧🇷',
    stickers: team('BRA', 'Brazil', [
      ['Team Logo', true], ['Alisson', false], ['Bento', false], ['Marquinhos', false],
      ['Éder Militão', false], ['Gabriel Magalhães', false], ['Danilo', false], ['Wesley', false],
      ['Lucas Paquetá', false], ['Casemiro', false], ['Bruno Guimarães', false], ['Luiz Henrique', false],
      ['Team Photo', true], ['Vinicius Júnior', false], ['Rodrygo', false], ['João Pedro', false],
      ['Matheus Cunha', false], ['Gabriel Martinelli', false], ['Raphinha', false], ['Estévão', false],
    ]),
  },
  {
    code: 'MAR', name: 'Morocco', flag: '🇲🇦',
    stickers: team('MAR', 'Morocco', [
      ['Team Logo', true], ['Yassine Bounou', false], ['Munir El Kajoui', false], ['Achraf Hakimi', false],
      ['Noussair Mazraoui', false], ['Nayef Aguerd', false], ['Roman Saiss', false], ['Jawad El Yamio', false],
      ['Adam Masina', false], ['Sofyan Amrabat', false], ['Azzedine Ounahi', false], ['Eliesse Ben Seghir', false],
      ['Team Photo', true], ['Bilal El Khannouss', false], ['Ismael Saibari', false], ['Youssef En-Nesyri', false],
      ['Abde Ezzalzouli', false], ['Soufiane Rahimi', false], ['Brahim Diaz', false], ['Ayoub El Kaabi', false],
    ]),
  },
  {
    code: 'HAI', name: 'Haiti', flag: '🇭🇹',
    stickers: team('HAI', 'Haiti', [
      ['Team Logo', true], ['Johny Placide', false], ['Carlens Arcus', false], ['Martin Expérience', false],
      ['Jean-Kevin Duverne', false], ['Ricardo Adé', false], ['Duke Lacroix', false], ['Garven Metusala', false],
      ['Hannes Delcroix', false], ['Leverton Pierre', false], ['Danley Jean Jacques', false], ['Jean-Ricner Bellegarde', false],
      ['Team Photo', true], ['Christopher Attys', false], ['Derrick Etienne Jr', false], ['Josue Casimir', false],
      ['Ruben Providence', false], ['Duckens Nazon', false], ['Louicius Deedson', false], ['Frantzdy Pierrot', false],
    ]),
  },
  {
    code: 'SCO', name: 'Scotland', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
    stickers: team('SCO', 'Scotland', [
      ['Team Logo', true], ['Angus Gunn', false], ['Jack Hendry', false], ['Kieran Tierney', false],
      ['Aaron Hickey', false], ['Andrew Robertson', false], ['Scott McKenna', false], ['John Souttar', false],
      ['Anthony Ralston', false], ['Grant Hanley', false], ['Scott McTominay', false], ['Billy Gilmour', false],
      ['Team Photo', true], ['Lewis Ferguson', false], ['Ryan Christie', false], ['Kenny McLean', false],
      ['John McGinn', false], ['Lyndon Dykes', false], ['Che Adams', false], ['Ben Gannon-Doak', false],
    ]),
  },
  {
    code: 'USA', name: 'USA', flag: '🇺🇸',
    stickers: team('USA', 'USA', [
      ['Team Logo', true], ['Matt Freese', false], ['Chris Richards', false], ['Tim Ream', false],
      ['Mark McKenzie', false], ['Alex Freeman', false], ['Antonee Robinson', false], ['Tyler Adams', false],
      ['Tanner Tessmann', false], ['Weston McKennie', false], ['Christian Roldan', false], ['Timothy Weah', false],
      ['Team Photo', true], ['Diego Luna', false], ['Malik Tillman', false], ['Christian Pulisic', false],
      ['Brenden Aaronson', false], ['Ricardo Pepi', false], ['Haji Wright', false], ['Folarin Balogun', false],
    ]),
  },
  {
    code: 'PAR', name: 'Paraguay', flag: '🇵🇾',
    stickers: team('PAR', 'Paraguay', [
      ['Team Logo', true], ['Roberto Fernandez', false], ['Orlando Gill', false], ['Gustavo Gomez', false],
      ['Fabián Balbuena', false], ['Juan José Cáceres', false], ['Omar Alderete', false], ['Junior Alonso', false],
      ['Mathías Villasanti', false], ['Diego Gomez', false], ['Damián Bobadilla', false], ['Andres Cubas', false],
      ['Team Photo', true], ['Matias Galarza Fonda', false], ['Julio Enciso', false], ['Alejandro Romero Gamarra', false],
      ['Miguel Almirón', false], ['Ramon Sosa', false], ['Angel Romero', false], ['Antonio Sanabria', false],
    ]),
  },
  {
    code: 'AUS', name: 'Australia', flag: '🇦🇺',
    stickers: team('AUS', 'Australia', [
      ['Team Logo', true], ['Mathew Ryan', false], ['Joe Gauci', false], ['Harry Souttar', false],
      ['Alessandro Circati', false], ['Jordan Bos', false], ['Aziz Behich', false], ['Cameron Burgess', false],
      ['Lewis Miller', false], ['Milos Degenek', false], ['Jackson Irvine', false], ['Riley McGree', false],
      ['Team Photo', true], ['Aiden O\'Neill', false], ['Connor Metcalfe', false], ['Patrick Yazbek', false],
      ['Craig Goodwin', false], ['Kusini Vengi', false], ['Nestory Irankunda', false], ['Mohamed Touré', false],
    ]),
  },
  {
    code: 'TUR', name: 'Türkiye', flag: '🇹🇷',
    stickers: team('TUR', 'Türkiye', [
      ['Team Logo', true], ['Ugurcan Cakir', false], ['Mert Muldur', false], ['Zeki Celik', false],
      ['Abdulkerim Bardakci', false], ['Caglar Soyuncu', false], ['Merih Demiral', false], ['Ferdi Kadioglu', false],
      ['Kaan Ayhan', false], ['Ismail Yuksek', false], ['Hakan Calhanoglu', false], ['Orkun Kokcu', false],
      ['Team Photo', true], ['Arda Guler', false], ['Irfan Can Kahveci', false], ['Yunus Akgun', false],
      ['Can Uzun', false], ['Baris Alper Yilmaz', false], ['Kerem Akturkoglu', false], ['Kenan Yildiz', false],
    ]),
  },
  {
    code: 'GER', name: 'Germany', flag: '🇩🇪',
    stickers: team('GER', 'Germany', [
      ['Team Logo', true], ['Marc-André ter Stegen', false], ['Jonathan Tah', false], ['David Raum', false],
      ['Nico Schlotterbeck', false], ['Antonio Rüdiger', false], ['Waldemar Anton', false], ['Ridle Baku', false],
      ['Maximilian Mittelstadt', false], ['Joshua Kimmich', false], ['Florian Wirtz', false], ['Felix Nmecha', false],
      ['Team Photo', true], ['Leon Goretzka', false], ['Jamal Musiala', false], ['Serge Gnabry', false],
      ['Kai Havertz', false], ['Leroy Sane', false], ['Karim Adeyemi', false], ['Nick Woltemade', false],
    ]),
  },
  {
    code: 'CUW', name: 'Curaçao', flag: '🇨🇼',
    stickers: team('CUW', 'Curaçao', [
      ['Team Logo', true], ['Eloy Room', false], ['Armando Obispo', false], ['Sherel Floranus', false],
      ['Jurien Gaari', false], ['Joshua Brenet', false], ['Roshon Van Eijma', false], ['Shurandy Sambo', false],
      ['Livano Comenencia', false], ['Godfried Roemeratoe', false], ['Juninho Bacuna', false], ['Leandro Bacuna', false],
      ['Team Photo', true], ['Tahith Chong', false], ['Kenji Gorre', false], ['Jearl Margaritha', false],
      ['Jurgen Locadia', false], ['Jeremy Antonisse', false], ['Gervane Kastaneer', false], ['Sontje Hansen', false],
    ]),
  },
  {
    code: 'CIV', name: 'Ivory Coast', flag: '🇨🇮',
    stickers: team('CIV', 'Ivory Coast', [
      ['Team Logo', true], ['Yahia Fofana', false], ['Ghislain Konan', false], ['Wilfried Singo', false],
      ['Odilon Kossounou', false], ['Evan Ndicka', false], ['Willy Boly', false], ['Emmanuel Agbadou', false],
      ['Ousmane Diomande', false], ['Franck Kessie', false], ['Seko Fofana', false], ['Ibrahim Sangare', false],
      ['Team Photo', true], ['Jean-Philippe Gbamin', false], ['Amad Diallo', false], ['Sébastien Haller', false],
      ['Simon Adingra', false], ['Yan Diomande', false], ['Evann Guessand', false], ['Oumar Diakite', false],
    ]),
  },
  {
    code: 'ECU', name: 'Ecuador', flag: '🇪🇨',
    stickers: team('ECU', 'Ecuador', [
      ['Team Logo', true], ['Hernán Galíndez', false], ['Gonzalo Valle', false], ['Piero Hincapié', false],
      ['Pervis Estupiñán', false], ['Willian Pacho', false], ['Ángelo Preciado', false], ['Joel Ordóñez', false],
      ['Moises Caicedo', false], ['Alan Franco', false], ['Kendry Paez', false], ['Pedro Vite', false],
      ['Team Photo', true], ['John Veboah', false], ['Leonardo Campana', false], ['Gonzalo Plata', false],
      ['Nilson Angulo', false], ['Alan Minda', false], ['Kevin Rodriguez', false], ['Enner Valencia', false],
    ]),
  },
  {
    code: 'NED', name: 'Netherlands', flag: '🇳🇱',
    stickers: team('NED', 'Netherlands', [
      ['Team Logo', true], ['Bart Verbruggen', false], ['Virgil van Dijk', false], ['Micky van de Ven', false],
      ['Jurrien Timber', false], ['Denzel Dumfries', false], ['Nathan Aké', false], ['Jeremie Frimpong', false],
      ['Jan Paul van Hecke', false], ['Tijjani Reijnders', false], ['Ryan Gravenberch', false], ['Teun Koopmeiners', false],
      ['Team Photo', true], ['Frenkie de Jong', false], ['Xavi Simons', false], ['Justin Kluivert', false],
      ['Memphis Depay', false], ['Donyell Malen', false], ['Wout Weghorst', false], ['Cody Gakpo', false],
    ]),
  },
  {
    code: 'JPN', name: 'Japan', flag: '🇯🇵',
    stickers: team('JPN', 'Japan', [
      ['Team Logo', true], ['Zion Suzuki', false], ['Henry Heroki Mochizuki', false], ['Ayumu Seko', false],
      ['Junnosuke Suzuki', false], ['Shogo Taniguchi', false], ['Tsuyoshi Watanabe', false], ['Kaishu Sano', false],
      ['Yuki Soma', false], ['Ao Tanaka', false], ['Daichi Kamada', false], ['Takefusa Kubo', false],
      ['Team Photo', true], ['Ritsu Doan', false], ['Keito Nakamura', false], ['Takumi Minamino', false],
      ['Shuto Machino', false], ['Junya Ito', false], ['Koki Ogawa', false], ['Ayase Ueda', false],
    ]),
  },
  {
    code: 'SWE', name: 'Sweden', flag: '🇸🇪',
    stickers: team('SWE', 'Sweden', [
      ['Team Logo', true], ['Victor Johansson', false], ['Isak Hien', false], ['Gabriel Gudmundsson', false],
      ['Emil Holm', false], ['Victor Nilsson Lindelöf', false], ['Gustaf Lagerbielke', false], ['Lucas Bergvall', false],
      ['Hugo Larsson', false], ['Jesper Karlström', false], ['Yasin Ayari', false], ['Mattias Svanberg', false],
      ['Team Photo', true], ['Daniel Svensson', false], ['Ken Sema', false], ['Roony Bardghji', false],
      ['Dejan Kulusevski', false], ['Anthony Elanga', false], ['Alexander Isak', false], ['Viktor Gyökeres', false],
    ]),
  },
  {
    code: 'TUN', name: 'Tunisia', flag: '🇹🇳',
    stickers: team('TUN', 'Tunisia', [
      ['Team Logo', true], ['Bechir Ben Said', false], ['Aymen Dahmen', false], ['Yan Valery', false],
      ['Montassar Talbi', false], ['Yassine Meriah', false], ['Ali Abdi', false], ['Dylan Bronn', false],
      ['Ellyes Skhiri', false], ['Aissa Laidouni', false], ['Ferjani Sassi', false], ['Mohamed Ali Ben Romdhane', false],
      ['Team Photo', true], ['Hannibal Mejbri', false], ['Elias Achouri', false], ['Elias Saad', false],
      ['Hazem Mastouri', false], ['Ismael Gharbi', false], ['Sayfallah Ltaief', false], ['Naim Sliti', false],
    ]),
  },
  {
    code: 'BEL', name: 'Belgium', flag: '🇧🇪',
    stickers: team('BEL', 'Belgium', [
      ['Team Logo', true], ['Thibaut Courtois', false], ['Arthur Theate', false], ['Timothy Castagne', false],
      ['Zeno Debast', false], ['Brandon Mechele', false], ['Maxim De Cuyper', false], ['Thomas Meunier', false],
      ['Youri Tielemans', false], ['Amadou Onana', false], ['Nicolas Raskin', false], ['Alexis Saelemaekers', false],
      ['Team Photo', true], ['Hans Vanaken', false], ['Kevin De Bruyne', false], ['Jérémy Doku', false],
      ['Charles De Ketelaere', false], ['Leandro Trossard', false], ['Loïs Openda', false], ['Romelu Lukaku', false],
    ]),
  },
  {
    code: 'EGY', name: 'Egypt', flag: '🇪🇬',
    stickers: team('EGY', 'Egypt', [
      ['Team Logo', true], ['Mohamed El Shenawy', false], ['Mohamed Hany', false], ['Mohamed Hamdy', false],
      ['Yasser Ibrahim', false], ['Khaled Sobhi', false], ['Ramy Rabia', false], ['Hossam Abdelmaguid', false],
      ['Ahmed Fatouh', false], ['Marwan Attia', false], ['Zizo', false], ['Hamdy Fathy', false],
      ['Team Photo', true], ['Mohamed Lasheen', false], ['Emam Ashour', false], ['Osama Faisal', false],
      ['Mohamed Salah', false], ['Mostafa Mohamed', false], ['Trezeguet', false], ['Omar Marmoush', false],
    ]),
  },
  {
    code: 'IRN', name: 'Iran', flag: '🇮🇷',
    stickers: team('IRN', 'Iran', [
      ['Team Logo', true], ['Alireza Beiranvand', false], ['Morteza Pouraliganji', false], ['Ehsan Hajsafi', false],
      ['Milad Mohammadi', false], ['Shojae Khalilzadeh', false], ['Ramin Rezaeian', false], ['Hossein Kanaani', false],
      ['Sadegh Moharrami', false], ['Saleh Hardani', false], ['Saeed Ezatolahi', false], ['Saman Ghoddos', false],
      ['Team Photo', true], ['Omid Noorafkan', false], ['Roozbeh Cheshmi', false], ['Mohammad Mohebi', false],
      ['Sardar Azmoun', false], ['Mehdi Taremi', false], ['Alireza Jahanbakhsh', false], ['Ali Gholizadeh', false],
    ]),
  },
  {
    code: 'NZL', name: 'New Zealand', flag: '🇳🇿',
    stickers: team('NZL', 'New Zealand', [
      ['Team Logo', true], ['Max Crocombe Payne', false], ['Alex Paulsen', false], ['Michael Boxall', false],
      ['Liberato Cacace', false], ['Tim Payne', false], ['Tyler Bindon', false], ['Francis de Vries', false],
      ['Finn Surman', false], ['Joe Bell', false], ['Sarpreet Singh', false], ['Ryan Thomas', false],
      ['Team Photo', true], ['Matthew Garbett', false], ['Marko Stamenić', false], ['Ben Old', false],
      ['Chris Wood', false], ['Elijah Just', false], ['Callum McCowatt', false], ['Kosta Barbarouses', false],
    ]),
  },
  {
    code: 'ESP', name: 'Spain', flag: '🇪🇸',
    stickers: team('ESP', 'Spain', [
      ['Team Logo', true], ['Unai Simon', false], ['Robin Le Normand', false], ['Aymeric Laporte', false],
      ['Dean Huijsen', false], ['Pedro Porro', false], ['Dani Carvajal', false], ['Marc Cucurella', false],
      ['Martín Zubimendi', false], ['Rodri', false], ['Pedri', false], ['Fabian Ruiz', false],
      ['Team Photo', true], ['Mikel Merino', false], ['Lamine Yamal', false], ['Dani Olmo', false],
      ['Nico Williams', false], ['Ferran Torres', false], ['Álvaro Morata', false], ['Mikel Oyarzabal', false],
    ]),
  },
  {
    code: 'CPV', name: 'Cape Verde', flag: '🇨🇻',
    stickers: team('CPV', 'Cape Verde', [
      ['Team Logo', true], ['Vozinha', false], ['Logan Costa', false], ['Pico', false],
      ['Diney', false], ['Steven Moreira', false], ['Wagner Pina', false], ['Joao Paulo', false],
      ['Yannick Semedo', false], ['Kevin Pina', false], ['Patrick Andrade', false], ['Jamiro Monteiro', false],
      ['Team Photo', true], ['Deroy Duarte', false], ['Garry Rodrigues', false], ['Jovane Cabral', false],
      ['Ryan Mendes', false], ['Dailon Livramento', false], ['Willy Semedo', false], ['Bebe', false],
    ]),
  },
  {
    code: 'KSA', name: 'Saudi Arabia', flag: '🇸🇦',
    stickers: team('KSA', 'Saudi Arabia', [
      ['Team Logo', true], ['Nawaf Alaqidi', false], ['Abdulrahman Al-Sanbi', false], ['Saud Abdulhamid', false],
      ['Nawaf Bouwashl', false], ['Jihad Thakri', false], ['Moteb Al-Harbi', false], ['Hassan Altambakti', false],
      ['Musab Aljuwayr', false], ['Ziyad Aljohani', false], ['Abdullah Alkhaibari', false], ['Nasser Aldawsari', false],
      ['Team Photo', true], ['Saleh Abu Alshamat', false], ['Marwan Alsahafi', false], ['Salem Aldawsari', false],
      ['Abdulrahman Al-Aboud', false], ['Feras Akbrikan', false], ['Saleh Alshehri', false], ['Abdullah Al-Hamdan', false],
    ]),
  },
  {
    code: 'URU', name: 'Uruguay', flag: '🇺🇾',
    stickers: team('URU', 'Uruguay', [
      ['Team Logo', true], ['Sergio Rochet', false], ['Santiago Mele', false], ['Ronald Araujo', false],
      ['José María Giménez', false], ['Sebastian Caceres', false], ['Mathias Olivera', false], ['Guillermo Varela', false],
      ['Nahitan Nandez', false], ['Federico Valverde', false], ['Giorgian De Arrascaeta', false], ['Rodrigo Bentancur', false],
      ['Team Photo', true], ['Manuel Ugarte', false], ['Nicolás de la Cruz', false], ['Maxi Araujo', false],
      ['Darwin Núñez', false], ['Federico Viñas', false], ['Rodrigo Aguirre', false], ['Facundo Pellistri', false],
    ]),
  },
  {
    code: 'FRA', name: 'France', flag: '🇫🇷',
    stickers: team('FRA', 'France', [
      ['Team Logo', true], ['Mike Maignan', false], ['Theo Hernandez', false], ['William Saliba', false],
      ['Jules Kounde', false], ['Ibrahima Konate', false], ['Dayot Upamecano', false], ['Lucas Digne', false],
      ['Aurélien Tchouaméni', false], ['Eduardo Camavinga', false], ['Manu Kone', false], ['Adrien Rabiot', false],
      ['Team Photo', true], ['Michael Olise', false], ['Ousmane Dembele', false], ['Bradley Barcola', false],
      ['Désiré Doué', false], ['Kingsley Coman', false], ['Hugo Ekitike', false], ['Kylian Mbappe', false],
    ]),
  },
  {
    code: 'SEN', name: 'Senegal', flag: '🇸🇳',
    stickers: team('SEN', 'Senegal', [
      ['Team Logo', true], ['Edouard Mendy', false], ['Yehvann Diouf', false], ['Moussa Niakhaté', false],
      ['Abdoulaye Seck', false], ['Ismail Jakobs', false], ['El Hadji Malick Diouf', false], ['Kalidou Koulibaly', false],
      ['Idrissa Gana Gueye', false], ['Pape Matar Sarr', false], ['Pape Gueye', false], ['Habib Diarra', false],
      ['Team Photo', true], ['Lamine Camara', false], ['Sadio Mane', false], ['Ismaïla Sarr', false],
      ['Boulaye Dia', false], ['Iliman Ndiaye', false], ['Nicolas Jackson', false], ['Krepin Diatta', false],
    ]),
  },
  {
    code: 'IRQ', name: 'Iraq', flag: '🇮🇶',
    stickers: team('IRQ', 'Iraq', [
      ['Team Logo', true], ['Jalal Hassan', false], ['Rebin Sulaka', false], ['Hussein Ali', false],
      ['Akam Hashem', false], ['Merchas Doski', false], ['Zaid Tahseen', false], ['Manaf Younis', false],
      ['Zidane Iqbal', false], ['Amir Al-Ammari', false], ['Ibrahim Bavesh', false], ['Ali Jasim', false],
      ['Team Photo', true], ['Youssef Amyn', false], ['Aimar Sher', false], ['Marko Farji', false],
      ['Osama Rashid', false], ['Ali Al-Hamadi', false], ['Aymen Hussein', false], ['Mohanad Ali', false],
    ]),
  },
  {
    code: 'NOR', name: 'Norway', flag: '🇳🇴',
    stickers: team('NOR', 'Norway', [
      ['Team Logo', true], ['Orjan Nyland', false], ['Julian Ryerson', false], ['Leo Ostigård', false],
      ['Kristoffer Vassbakk Ajer', false], ['Marcus Holmgren Pedersen', false], ['David Møller Wolfe', false], ['Torbjørn Heggem', false],
      ['Morten Thorsby', false], ['Martin Ødegaard', false], ['Sander Berge', false], ['Andreas Schjelderup', false],
      ['Team Photo', true], ['Patrick Berg', false], ['Erling Haaland', false], ['Alexander Sørloth', false],
      ['Aron Dønnum', false], ['Jorgen Strand Larsen', false], ['Antonio Nusa', false], ['Oscar Bobb', false],
    ]),
  },
  {
    code: 'ARG', name: 'Argentina', flag: '🇦🇷',
    stickers: team('ARG', 'Argentina', [
      ['Team Logo', true], ['Emiliano Martinez', false], ['Nahuel Molina', false], ['Cristian Romero', false],
      ['Nicolas Otamendi', false], ['Nicolas Tagliafico', false], ['Leonardo Balerdi', false], ['Enzo Fernandez', false],
      ['Alexis Mac Allister', false], ['Rodrigo De Paul', false], ['Exequiel Palacios', false], ['Leandro Paredes', false],
      ['Team Photo', true], ['Nico Paz', false], ['Franco Mastantuono', false], ['Nico Gonzalez', false],
      ['Lionel Messi', false], ['Lautaro Martinez', false], ['Julian Alvarez', false], ['Giuliano Simeone', false],
    ]),
  },
  {
    code: 'ALG', name: 'Algeria', flag: '🇩🇿',
    stickers: team('ALG', 'Algeria', [
      ['Team Logo', true], ['Alexis Guendouz', false], ['Ramy Bensebaini', false], ['Youcef Atal', false],
      ['Rayan Aït-Nouri', false], ['Mohamed Amine Tougai', false], ['Aïssa Mandi', false], ['Ismael Bennacer', false],
      ['Houssem Aquar', false], ['Hicham Boudaoui', false], ['Ramiz Zerrouki', false], ['Nabil Bentalab', false],
      ['Team Photo', true], ['Farés Chaibi', false], ['Riyad Mahrez', false], ['Said Benrahma', false],
      ['Anis Hadj Moussa', false], ['Amine Gouiri', false], ['Baghdad Bounedjah', false], ['Mohammed Amoura', false],
    ]),
  },
  {
    code: 'AUT', name: 'Austria', flag: '🇦🇹',
    stickers: team('AUT', 'Austria', [
      ['Team Logo', true], ['Alexander Schlager', false], ['Patrick Pentz', false], ['David Alaba', false],
      ['Kevin Danso', false], ['Philipp Lienhart', false], ['Stefan Posch', false], ['Phillipp Mwene', false],
      ['Alexander Prass', false], ['Xaver Schlager', false], ['Marcel Sabitzer', false], ['Konrad Laimer', false],
      ['Team Photo', true], ['Florian Grillitsch', false], ['Nicolas Seiwald', false], ['Romano Schmid', false],
      ['Patrick Wimmer', false], ['Christoph Baumgartner', false], ['Michael Gregoritsch', false], ['Marko Arnautović', false],
    ]),
  },
  {
    code: 'JOR', name: 'Jordan', flag: '🇯🇴',
    stickers: team('JOR', 'Jordan', [
      ['Team Logo', true], ['Yazeed Abulaila', false], ['Ihsan Haddad', false], ['Mohammad Abu Hashish', false],
      ['Yazan Al-Arab', false], ['Abdallah Nasib', false], ['Saleem Obaid', false], ['Mohammad Abualnadi', false],
      ['Ibrahim Saadeh', false], ['Nizar Al-Rashdan', false], ['Noor Al-Rawabdeh', false], ['Mohannad Abu Taha', false],
      ['Team Photo', true], ['Amer Jamous', false], ['Musa Al-Taamari', false], ['Yazan Al-Naimat', false],
      ['Mahmoud Al-Mardi', false], ['Ali Olwan', false], ['Mohammad Abu Zrayq', false], ['Ibrahim Sabra', false],
    ]),
  },
  {
    code: 'POR', name: 'Portugal', flag: '🇵🇹',
    stickers: team('POR', 'Portugal', [
      ['Team Logo', true], ['Diogo Costa', false], ['Jose Sa', false], ['Ruben Dias', false],
      ['João Cancelo', false], ['Diogo Dalot', false], ['Nuno Mendes', false], ['Gonçalo Inácio', false],
      ['Bernardo Silva', false], ['Bruno Fernandes', false], ['Ruben Neves', false], ['Vitinha', false],
      ['Team Photo', true], ['João Neves', false], ['Cristiano Ronaldo', false], ['Francisco Trincao', false],
      ['João Felix', false], ['Gonçalo Ramos', false], ['Pedro Neto', false], ['Rafael Leão', false],
    ]),
  },
  {
    code: 'COD', name: 'Congo DR', flag: '🇨🇩',
    stickers: team('COD', 'Congo DR', [
      ['Team Logo', true], ['Lionel Mpasi', false], ['Aaron Wan-Bissaka', false], ['Axel Tuanzebe', false],
      ['Arthur Masuaku', false], ['Chancel Mbemba', false], ['Joris Kayembe', false], ['Charles Pickel', false],
      ['Ngal\'ayel Mukau', false], ['Edo Kayembe', false], ['Samuel Moutoussamy', false], ['Noah Sadiki', false],
      ['Team Photo', true], ['Théo Bongonda', false], ['Meschak Elia', false], ['Yoane Wissa', false],
      ['Brian Cipenga', false], ['Fiston Mayele', false], ['Cédric Bakambu', false], ['Nathanaël Mbuku', false],
    ]),
  },
  {
    code: 'UZB', name: 'Uzbekistan', flag: '🇺🇿',
    stickers: team('UZB', 'Uzbekistan', [
      ['Team Logo', true], ['Utkir Yusupov', false], ['Farrukh Savfiev', false], ['Sherzod Nasrullaev', false],
      ['Umar Eshmurodov', false], ['Husniddin Aliqulov', false], ['Rustamjon Ashurmatov', false], ['Khojiakbar Alijonov', false],
      ['Abdukodir Khusanov', false], ['Odiljon Hamrobekov', false], ['Otabek Shukurov', false], ['Jamshid Iskanderov', false],
      ['Team Photo', true], ['Azizbek Turgunboev', false], ['Khojimat Erkinov', false], ['Eldor Shomurodov', false],
      ['Oston Urunov', false], ['Jaloliddin Masharipov', false], ['Igor Sergeev', false], ['Abbosbek Fayzullaev', false],
    ]),
  },
  {
    code: 'COL', name: 'Colombia', flag: '🇨🇴',
    stickers: team('COL', 'Colombia', [
      ['Team Logo', true], ['Camilo Vargas', false], ['David Ospina', false], ['Dávinson Sánchez', false],
      ['Yerry Mina', false], ['Daniel Munoz', false], ['Johan Mojica', false], ['Jhon Lucumí', false],
      ['Santiago Arias', false], ['Jefferson Lerma', false], ['Kevin Castaño', false], ['Richard Rios', false],
      ['Team Photo', true], ['James Rodriguez', false], ['Juan Fernando Quintero', false], ['Jorge Carrascal', false],
      ['Jon Arias', false], ['Jhon Cordova', false], ['Luis Suarez', false], ['Luis Diaz', false],
    ]),
  },
  {
    code: 'ENG', name: 'England', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
    stickers: team('ENG', 'England', [
      ['Team Logo', true], ['Jordan Pickford', false], ['John Stones', false], ['Marc Guéhi', false],
      ['Ezri Konsa', false], ['Trent Alexander-Arnold', false], ['Reece James', false], ['Dan Burn', false],
      ['Jordan Henderson', false], ['Declan Rice', false], ['Jude Bellingham', false], ['Cole Palmer', false],
      ['Team Photo', true], ['Morgan Rogers', false], ['Anthony Gordon', false], ['Phil Foden', false],
      ['Bukayo Saka', false], ['Harry Kane', false], ['Marcus Rashford', false], ['Ollie Watkins', false],
    ]),
  },
  {
    code: 'CRO', name: 'Croatia', flag: '🇭🇷',
    stickers: team('CRO', 'Croatia', [
      ['Team Logo', true], ['Dominik Livaković', false], ['Duje Caleta-Car', false], ['Josko Gvardiol', false],
      ['Josip Stanišić', false], ['Luka Vušković', false], ['Josip Sutalo', false], ['Kristijan Jakic', false],
      ['Luka Modrić', false], ['Mateo Kovacic', false], ['Martin Baturina', false], ['Lovro Majer', false],
      ['Team Photo', true], ['Mario Pasalic', false], ['Petar Sucic', false], ['Ivan Perišić', false],
      ['Marco Pasalic', false], ['Ante Budimir', false], ['Andrej Kramarić', false], ['Franjo Ivanovic', false],
    ]),
  },
  {
    code: 'GHA', name: 'Ghana', flag: '🇬🇭',
    stickers: team('GHA', 'Ghana', [
      ['Team Logo', true], ['Lawrence Ati Zigi', false], ['Tariq Lamptey', false], ['Mohammed Salisu', false],
      ['Alidu Seidu', false], ['Alexander Djiku', false], ['Gideon Mensah', false], ['Caleb Yirenkyi', false],
      ['Abdul Issahaku Fatawu', false], ['Thomas Partey', false], ['Salis Abdul Samed', false], ['Kamaldeen Sulemana', false],
      ['Team Photo', true], ['Mohammed Kudus', false], ['Inaki Williams', false], ['Jordan Ayew', false],
      ['Andrew Ayew', false], ['Joseph Paintsil', false], ['Osman Bukari', false], ['Antoine Semenyo', false],
    ]),
  },
  {
    code: 'PAN', name: 'Panama', flag: '🇵🇦',
    stickers: team('PAN', 'Panama', [
      ['Team Logo', true], ['Orlando Mosquera', false], ['Luis Mejia', false], ['Fidel Escobar', false],
      ['Andres Andrade', false], ['Michael Amir Murillo', false], ['Eric Davis', false], ['Jose Cordoba', false],
      ['Cesar Blackman', false], ['Cristian Martinez', false], ['Aníbal Godoy', false], ['Adalberto Carrasquilla', false],
      ['Team Photo', true], ['Édgar Bárcenas', false], ['Carlos Harvey', false], ['Ismael Díaz', false],
      ['Jose Fajardo', false], ['Cecilio Waterman', false], ['Jose Luiz Rodriguez', false], ['Alberto Quintero', false],
    ]),
  },
]

// ─── FLAT LIST OF ALL 980 STICKERS (album order) ─────────────────────────────
export const allStickers: Sticker[] = [
  ...introStickers,
  ...teamSections.flatMap(t => t.stickers),
  ...historyStickers,
]

// ─── LOOKUP MAP ──────────────────────────────────────────────────────────────
export const stickerMap: Record<string, Sticker> = Object.fromEntries(
  allStickers.map(s => [s.id, s])
)
