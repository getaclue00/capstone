class CreateServices < ActiveRecord::Migration[5.0]
  def change
    create_table :services do |t|
      t.string :name
      t.decimal :price_small
      t.decimal :price_large
      t.decimal :duration
      t.text :description

      t.timestamps
    end
  end
end
