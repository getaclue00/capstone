class CreateEmployees < ActiveRecord::Migration[5.0]
  def change
    #The default primary key for all Active Record models is id. 
    #The timestamps macro adds two columns, created_at and updated_at.
    create_table :employees do |t|
      t.string :last_name
      t.string :first_name
      t.string :email
      t.string :phone_number
      t.integer :street_number
      t.string :street_name
      t.string :city
      t.string :province
      t.string :postal_code
      t.date :start_date
      t.boolean :is_admin

      t.timestamps
    end
  end
end
