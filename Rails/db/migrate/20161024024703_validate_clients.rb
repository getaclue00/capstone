class ValidateClients < ActiveRecord::Migration[5.0]
  def up
  	#city and province are not required for now

  	change_column :clients, :last_name, :string, :limit => 30

  	change_column :clients, :first_name, :string, :limit => 30

 	change_column :clients, :email, :string, :limit => 30
 	change_column_null :clients, :email, false
 	add_index :clients, :email, unique: true

 	#assuming format 000-000-0000
 	change_column :clients, :phone_number, :string, :limit => 12
  	change_column_null :clients, :phone_number, false

  	change_column :clients, :street_number, :integer
  	change_column_null :clients, :street_number, false
 
  	change_column :clients, :street_name, :string, :limit => 30
  	change_column_null :clients, :street_name, false

  	change_column :clients, :city, :string, :limit => 30
  
  	change_column :clients, :province, :string, :limit => 30

  	#assuming format h5h 6u6
  	#note: look into regexp
  	change_column :clients, :postal_code, :string, :limit => 7
  	change_column_null :clients, :postal_code, false
	end
  
  def down
  	change_column :clients, :last_name, :string, :limit => nil

  	change_column :clients, :first_name, :string, :limit => nil

  	change_column :clients, :email, :string, :limit => nil
  	change_column_null :clients, :email, true
  	remove_index :clients, column: :email

  	change_column :clients, :phone_number, :string, :limit => nil
  	change_column_null :clients, :phone_number, true

  	change_column_null :clients, :street_number, true

  	change_column :clients, :street_name, :string, :limit => nil
  	change_column_null :clients, :street_name, true
  
  	change_column :clients, :city, :string, :limit => nil
  
  	change_column :clients, :province, :string, :limit => nil
  	
  	change_column :clients, :postal_code, :string, :limit => nil
  	change_column_null :clients, :postal_code, true
  end
end

#t.change :price, :decimal, :precision => 10, :scale => 5

# change_table :clients do |t| #use this over change_column :table_name, :column_name, :newType when you want to modify multiple columns
#   		t.change :email, :string, :primary_key, :null
#   		t.index :email
# 	end