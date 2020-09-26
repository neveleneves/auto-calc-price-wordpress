<?php
//Plugin name: AutoCalcPriceDocuments 
//Author: Max Nikonov 
//Author URI: https://github.com/neveleneves
//Version: 1.0.0
//Description: Auto price calculation for printing DOC/PDF documents

//Load Script files
function loadScripts() {
    //Include a libs and api-code
    //1) Include a pdf.js lib
    wp_enqueue_script('pdf_js', plugin_dir_url(__FILE__) . '/libs/pdfjs/build/pdf.js', array(), false, true);
	wp_enqueue_script('pdf_worker_js', plugin_dir_url(__FILE__) . '/libs/pdfjs/build/pdf.worker.js', array(), false, true);
	
    //2) Include a convertapi-js sorce
    wp_register_script( 'convertapi_js', '//unpkg.com/convertapi-js@1.0.6/lib/convertapi.js', array('jquery'), false, true);
	wp_enqueue_script( 'convertapi_js' );
    
    //Include a main JS code 
    wp_enqueue_script('index_js', plugin_dir_url(__FILE__) . '/assets/js/bundle.js', array(), false, true);
}
add_action( 'wp_enqueue_scripts', 'loadScripts');

//Search a product in Woocommerce by SKU identifier
function get_product_by_sku($sku) {
	global $wpdb;
	$product_id = $wpdb->get_var($wpdb->prepare("SELECT post_id FROM $wpdb->postmeta WHERE meta_key='_sku' AND meta_value='%s' LIMIT 1", $sku));
	if ($product_id) return $product_id;
	return null;
}

//Delete a product in Woocommerce by ID
function remove_product_by_id($id) {
	if($id == 0) return;
	else {
		global $wpdb;
		$delete_post = $wpdb->get_row($wpdb->prepare("SELECT * FROM $wpdb->posts WHERE ID = %d", $id));
		$delete_post = get_post($delete_post);
		return wp_delete_post($id, true);
	}
}

//Create a plugin products in Woocommerce 
function createProducts() {
	$checkProducts = array(
		0 => get_product_by_sku("BWPrintingPlugin"),
		1 => get_product_by_sku("ColorPrintingPlugin")
	);
	if($checkProducts[0] == 0 || $checkProducts[1] == 0) {
		if($checkProducts[0] == 0) remove_product_by_id($checkProducts[1]);
		else if($checkProducts[1] == 0) remove_product_by_id($checkProducts[0]);
	}
	else if($checkProducts[0] > 0 && $checkProducts[1] > 0) return;
	
    $print_name = array(
		0 => 'B&W print (piece / rubles)',
        1 => 'Color print (piece / rubles)'
	);
	for ($i=0; $i <= 1; $i++) {
		$post_id = wp_insert_post(
			array(
				'post_title' => $print_name[$i],
				'post_type' => 'product',
				'post_status' => 'publish'
			)
		);
	wp_set_object_terms($post_id, 'simple', 'product_type'); 
	update_post_meta($post_id, '_visibility', 'visible');
	update_post_meta($post_id, '_stock_status', 'instock');
	if ($i == 0) {
		update_post_meta($post_id, '_sku', "BWPrintingPlugin");
		update_post_meta($post_id, '_price', '3' );
	}
	else if ($i == 1) {
		update_post_meta($post_id, '_sku', "ColorPrintingPlugin");
		update_post_meta($post_id, '_price', '5' );
	}
	update_post_meta($post_id, '_manage_stock', 'no' ); 
  }
}
add_action( 'template_redirect', 'createProducts' ); 

//Get a prices from plugin products in Woocommerce
function catchProductPrice() {
	$checkProducts = array(
		0 => get_product_by_sku("BWPrintingPlugin"),
		1 => get_product_by_sku("ColorPrintingPlugin")
	);
	$priceProducts = array (
		0 => get_post_meta($checkProducts[0], '_price', true), 
		1 => get_post_meta($checkProducts[1], '_price', true) 
	);
	setcookie("BWPrice", $priceProducts[0]);
	setcookie("ColorPrice", $priceProducts[1]);
}
add_action('template_redirect', 'catchProductPrice');