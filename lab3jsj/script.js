/**
 * Класс, представляющий предмет инвентаря.
 */
class Item {
    /**
     * @param {string} name - Название предмета.
     * @param {number} weight - Вес предмета.
     * @param {'common'|'uncommon'|'rare'|'legendary'} rarity - Редкость предмета.
     */
    constructor(name, weight, rarity) {
      this.name = name;
      this.weight = weight;
      this.rarity = rarity;
    }
  
    /**
     * Получить информацию о предмете.
     * @returns {string}
     */
    getInfo() {
      return `Предмет: ${this.name}, Вес: ${this.weight} кг, Редкость: ${this.rarity}`;
    }
  
    /**
     * Установить новый вес.
     * @param {number} newWeight
     */
    setWeight(newWeight) {
      this.weight = newWeight;
    }
  }
  
  /**
   * Класс оружия, наследуется от Item.
   */
  class Weapon extends Item {
    /**
     * @param {string} name
     * @param {number} weight
     * @param {'common'|'uncommon'|'rare'|'legendary'} rarity
     * @param {number} damage - Урон.
     * @param {number} durability - Прочность (0-100).
     */
    constructor(name, weight, rarity, damage, durability) {
      super(name, weight, rarity);
      this.damage = damage;
      this.durability = durability;
    }
  
    /**
     * Использовать оружие (уменьшить прочность).
     */
    use() {
      if (this.durability > 0) {
        this.durability -= 10;
        console.log(`${this.name} использовано. Прочность теперь: ${this.durability}`);
      } else {
        console.log(`${this.name} сломано!`);
      }
    }
  
    /**
     * Починить оружие.
     */
    repair() {
      this.durability = 100;
      console.log(`${this.name} починено.`);
    }
  
    /**
     * Переопределить getInfo для отображения урона и прочности.
     * @returns {string}
     */
    getInfo() {
      return `${super.getInfo()}, Урон: ${this.damage}, Прочность: ${this.durability}`;
    }
  }
  
  // Пример использования классов
  const sword = new Item("Steel Sword", 3.5, "rare");
  console.log(sword.getInfo());
  sword.setWeight(4.0);
  console.log(sword.getInfo());
  
  const bow = new Weapon("Longbow", 2.0, "uncommon", 15, 100);
  console.log(bow.getInfo());
  bow.use();
  bow.use();
  console.log("Текущая прочность:", bow?.durability); // Опциональная цепочка
  bow.repair();
  console.log(bow.getInfo());
  