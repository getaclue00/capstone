class CreateClients < ActiveRecord::Migration[5.0]
  def change
    create_table :clients do |t|
      t.string :last_name
      t.string :first_name
      t.string :email
      t.string :phone_number
      t.integer :street_number
      t.string :street_name
      t.string :city
      t.string :province
      t.string :postal_code

      t.timestamps
    end
  end
end
