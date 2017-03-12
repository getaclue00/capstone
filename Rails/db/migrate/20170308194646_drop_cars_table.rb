class DropCarsTable < ActiveRecord::Migration[5.0]
  def up
    drop_table :cars
  end

  def down
    create_table :cars do |t|
      t.string :make
      t.string :model
      t.string :size
      t.string :interior
      t.string :colour

      t.timestamps
    end
  end
end
